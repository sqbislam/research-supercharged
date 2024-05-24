import { Input } from '@/components/ui/input';

export default function ResearchPage() {
  return (
    <section>
      <div className='flex max-w-md border-emerald-500 mx-auto items-center justify-center mt-10'>
        <Input
          name='Topic'
          placeholder='Type your research topic here...'
          className='w-full p-5'
        />
      </div>
    </section>
  );
}
