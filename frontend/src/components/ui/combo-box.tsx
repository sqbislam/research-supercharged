'use client';

import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';
import * as React from 'react';
import {
  ControllerFieldState,
  ControllerRenderProps,
  UseFormStateReturn,
} from 'react-hook-form';

import { categories_cs } from '@/lib/constants/category_constants';
import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

export function ComboboxDemo(props: {
  field: ControllerRenderProps<
    {
      title: string;
      category: string;
      keywords: string;
      description: string;
    },
    'category'
  >;
  fieldState: ControllerFieldState;
  formState: UseFormStateReturn<any>;
}) {
  const { field } = props;
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');
  const onValueChange = (value: string) => {
    field.onChange(value);
  };
  return (
    <div className='w-full flex flex-col justify-center'>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            role='combobox'
            aria-expanded={open}
            className='w-full justify-between'
          >
            {value
              ? categories_cs.find(
                  (framework) => framework.value.toLowerCase() === value
                )?.label
              : 'Select category...'}
            <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='max-w-[400px] w-full p-0 overflow-y-scroll max-h-[500px]'>
          <Command>
            <CommandInput placeholder='Search framework...' className='h-9' />
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {categories_cs.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    onValueChange(currentValue);
                    setValue(currentValue === value ? '' : currentValue);
                    setOpen(false);
                  }}
                >
                  {framework.label}
                  <CheckIcon
                    className={cn(
                      'ml-auto h-4 w-4',
                      value === framework.value ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
