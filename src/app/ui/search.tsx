'use client';

import {
  useSearchParams,
  usePathname,
  useRouter
} from 'next/navigation';
import { LuSearch } from 'react-icons/lu';
import { useDebouncedCallback } from 'use-debounce';

export default function Search({ placeholder }: { placeholder: string }) {
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
    <label className="group input input-bordered input-sm flex items-center rounded-full bg-base-100">
      <input
        type="text"
        className="grow"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get('query')?.toString()}
      />
      <LuSearch className='opacity-60' />
    </label>
  )
}