import { Button, Link } from '@nextui-org/react';
import Image from 'next/image';

export default function LinkBadge({
  badgeTitle,
  icon,
  href,
}: {
  badgeTitle: string;
  icon: any;
  href: string;
}) {
  return (
    <Button
      href={href}
      as={Link}
      showAnchorIcon
      radius='full'
      className='w-fit bg-white shadow-soft-sm'
      startContent={
        <Image
          src={icon}
          alt={badgeTitle}
          width={24}
          height={24}
          className='w-6 min-w-6'
        />
      }
    >
      <p className='text-sm text-black'>{badgeTitle}</p>
    </Button>
  );
}
