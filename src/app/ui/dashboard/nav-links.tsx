'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import {
  LuHome,
  LuBookOpen,
  LuUsers,
} from "react-icons/lu";

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'ホーム', href: '/dashboard', icon: LuHome },
  { name: 'シナリオ', href: '/dashboard/scenarios', icon: LuBookOpen },
  { name: 'ユーザー', href: '/dashboard/users', icon: LuUsers },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 p-3 text-sm font-medium bg-base-200 rounded-md hover-primary md:flex-none md:justify-start md:py-2 md:px-4 duration-150',
              {
                'selected-primary': pathname === link.href,
              },
            )}
          >
            <LinkIcon className='w-6' />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
