'use client';

import { Input } from '@nextui-org/react';
import { SearchIcon } from 'lucide-react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function Search({
  placeholder,
  value,
}: {
  placeholder: string;
  value?: string;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    console.log(`Searching... ${term}`);

    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <Input
      isClearable
      type='text'
      label={placeholder}
      classNames={{
        base: 'max-w-96',
        label: 'text-black/50 dark:text-white/90',
        input: [
          'bg-transparent',
          'text-black/90 dark:text-white/90',
          'placeholder:text-default-700/50 dark:placeholder:text-white/60',
        ],
        innerWrapper: 'bg-transparent',
        inputWrapper: [
          // 'shadow-md',
          'bg-default-200/50',
          'dark:bg-default/60',
          'backdrop-blur-xl',
          'backdrop-saturate-200',
          'hover:bg-default-200/70',
          'dark:hover:bg-default/70',
          'group-data-[focus=true]:bg-default-200/50',
          'dark:group-data-[focus=true]:bg-default/60',
          '!cursor-text',
        ],
      }}
      startContent={
        <SearchIcon
          size={18}
          className='pointer-events-none flex-shrink-0 text-black/50 text-slate-400 dark:text-white/90'
        />
      }
      defaultValue={value}
      onValueChange={(value) => {
        handleSearch(value.trim());
      }}
    />
  );
}
