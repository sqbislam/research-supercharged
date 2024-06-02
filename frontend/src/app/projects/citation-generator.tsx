/* eslint-disable no-case-declarations */
import { Article } from '@/lib/types';
import { getDate } from '@/lib/utils';

export default function CitationGenerator({ article }: { article: Article }) {
  const formatAuthors = (
    authors: string[],
    format: 'APA' | 'MLA' | 'Chicago' | 'IEEE'
  ) => {
    switch (format) {
      case 'APA':
        return authors
          .map((author, index) => {
            const [lastName, firstName] = author.split(' ');
            return `${lastName}, ${firstName.charAt(0)}.`;
          })
          .join(', ');
      case 'MLA':
        return authors.join(', ').replace(/,(?=[^,]*$)/, ', and');
      case 'Chicago':
        return authors.join(', ').replace(/,(?=[^,]*$)/, ', and');
      case 'IEEE':
        return authors
          .map((author) => {
            const [lastName, firstName] = author.split(', ');
            return `${firstName} ${lastName}`;
          })
          .join(', ');
      default:
        return '';
    }
  };

  const formatPublishedDate = (
    date: string | undefined,
    format: 'APA' | 'MLA' | 'Chicago' | 'IEEE'
  ) => {
    if (!date) return '';
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    const formattedDate = getDate(date);

    switch (format) {
      case 'APA':
      case 'Chicago':
        return formattedDate;
      case 'MLA':
        const [month, day, year] = formattedDate.split(' ');
        return `${day} ${month} ${year}`;
      case 'IEEE':
        const [IEEEday, IEEEyear] = formattedDate.split(', ');
        return `${IEEEday}, ${IEEEyear}`;
      default:
        return '';
    }
  };

  const formatCitation = (format: 'APA' | 'MLA' | 'Chicago' | 'IEEE') => {
    const { title, authors, journal_ref, doi, published_date } = article;
    const formattedAuthors = formatAuthors(authors?.author_list || [], format);
    const formattedDate = formatPublishedDate(published_date, format);
    const journalRef = journal_ref ? `, ${journal_ref}` : '';
    const doiRef = doi ? ` https://doi.org/${doi}` : '';

    switch (format) {
      case 'APA':
        return `${formattedAuthors} (${formattedDate}). ${title}.${journalRef}${doiRef}`;
      case 'MLA':
        return `${formattedAuthors}. "${title}."${journalRef}, ${formattedDate}.${doiRef}`;
      case 'Chicago':
        return `${formattedAuthors}. "${title}." ${journalRef} (${formattedDate}).${doiRef}`;
      case 'IEEE':
        return `${formattedAuthors}, "${title},"${journalRef}, ${formattedDate}.${doiRef}`;
      default:
        return '';
    }
  };
  return formatCitation;
}
