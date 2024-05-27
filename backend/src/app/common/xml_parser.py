import xml.etree.ElementTree as ET 
import logging
class XMLParser():
    
    async def parse(self, xml_data: str):
        namespace = {'atom': 'http://www.w3.org/2005/Atom', 'arxiv': 'http://arxiv.org/schemas/atom', 'opensearch': 'http://a9.com/-/spec/opensearch/1.1/'}
        try:
            # Parse XML and return data
            res = []
            myroot = ET.fromstring(xml_data)
            # Extract data from XML entry
            for x in myroot.findall('.//atom:entry', namespace):
                title =x.find('.//atom:title', namespace).text
                summary = x.find('.//atom:summary', namespace).text
                doi = x.find('.//arxiv:doi', namespace).text
                category = x.find('.//arxiv:primary_category', namespace).attrib.get('term')
                link = x.findall('.//atom:link', namespace)
                journal_ref = x.find('.//arxiv:journal_ref', namespace).text

                # Extract pdf link
                for l in link:
                    if l.attrib.get('title') and l.attrib['title'] == 'pdf':
                        link = l.attrib.get('href')
                # Extract authors           
                author_all = x.findall('.//atom:author/atom:name', namespace)
                authors = []
                for author in author_all:
                    authors.append(author.text)
                res.append({'title': title, 'abstract': summary, 'doi': doi, 'link': link, 'authors': str(authors), 'category': category, 'journal_ref':journal_ref})
        except:
            logging.error("Error in parsing XML data")
        return res
        