import { Combobox } from '@/components/ui/combo-box';
import { Input } from '@/components/ui/input';

export default function ResearchPage() {
  return (
    <section>
      <div className='flex flex-col max-w-md border-emerald-500 mx-auto items-center justify-center mt-10'>
        <Combobox
          name='category'
          description='Select the field of your research'
        />
        <Input
          name='Topic'
          placeholder='Type your research topic here...'
          className='w-full p-5'
        />
      </div>
    </section>
  );
}
