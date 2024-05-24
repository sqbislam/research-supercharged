import UnderlineLink from '@/components/links/UnderlineLink';

export default function Footer() {
  return (
    <footer className='absolute bottom-2 mx-auto w-full text-center p-4'>
      © {new Date().getFullYear()} By{' '}
      <UnderlineLink href='https://saqib-islam.com'>Saqib Islam</UnderlineLink>
    </footer>
  );
}
