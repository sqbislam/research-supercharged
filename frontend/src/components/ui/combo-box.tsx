'use client';

import { Label } from '@radix-ui/react-dropdown-menu';
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';
import * as React from 'react';

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

import { categories_cs } from '@/app/api/constants/category_constants';

export function ComboboxDemo() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');

  return (
    <div className='w-full flex flex-col justify-center'>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            role='combobox'
            aria-expanded={open}
            className='max-w-[400px] w-full justify-between'
          >
            {value
              ? categories_cs.find(
                  (framework) => framework.value.toLowerCase() === value
                )?.label
              : 'Select framework...'}
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
                    console.debug({ value });
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
