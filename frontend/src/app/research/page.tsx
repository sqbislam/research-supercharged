'use client';
import { ComboboxDemo } from '@/components/ui/combo-box';
import { Input } from '@/components/ui/input';

export default function ResearchPage() {
  return (
    <section>
      <div className='flex flex-col max-w-md border-emerald-500 mx-auto items-center justify-center mt-10'>
        <Input
          name='Topic'
          placeholder='Type your research topic here...'
          className='w-full p-5 m-5'
        />
        <ComboboxDemo />
      </div>
    </section>
  );
}
