'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { z } from 'zod';

import { useForm } from '@/hooks/useForm';

import { Button } from '@/components/ui/button';
import { ComboboxDemo } from '@/components/ui/combo-box';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
const schema = z.object({
  title: z.string().min(2, {
    message: 'Title must be at least 2 characters.',
  }),
  category: z.string().min(2, 'Category must be at least 2 characters.'),
  keywords: z.string().min(2, 'keywords must be at least 2 characters.'),
  description: z.string().min(2, 'description must be at least 2 characters.'),
});
type FormData = z.infer<typeof schema>;

const defaultValues: FormData = {
  title: '',
  category: '',
  keywords: '',
  description: '',
};

export function ProjectForm() {
  const apiRoute = 'api/projects';
  const config = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  };
  const router = useRouter();
  const { onSubmitHandler, form, isLoading } = useForm({
    schema,
    defaultValues,
    apiRoute,
    config,
  });
  const onSubmit = (data: FormData) => {
    toast('Project Created Sucessfully! 🎉');
    router.push('projects/list');
  };
  return (
    <Form {...form}>
      <form
        onSubmit={onSubmitHandler(onSubmit)}
        className='flex flex-col max-w-lg bg-secondary mx-auto p-10 gap-5 rounded-md'
      >
        <h2>Create a Project</h2>
        <h5 className='pb-5'>Describe your research topic and category</h5>
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Research Title</FormLabel>
              <FormControl>
                <Input
                  placeholder='Type your research topic here...'
                  className='w-full bg-primary-foreground'
                  {...field}
                />
              </FormControl>
              <FormDescription className='text-xs'>
                This is your research title/topic that will be used to generate
                suggestions.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='category'
          render={(props) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <ComboboxDemo {...props} />
              </FormControl>
              <FormDescription className='text-xs'>
                This is your research category that will be used to generate
                suggestions.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='keywords'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Keywords</FormLabel>
              <FormControl>
                <Input
                  placeholder='Type your keywords'
                  className='w-full bg-primary-foreground'
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input
                  placeholder='Type your description here...'
                  className='w-full bg-primary-foreground'
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type='submit'
          onClick={onSubmitHandler(onSubmit)}
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Submit'}
        </Button>
      </form>
    </Form>
  );
}
