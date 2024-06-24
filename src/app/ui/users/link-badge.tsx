import { Button, Link } from "@nextui-org/react";
import Image from "next/image"
import { LuExternalLink } from "react-icons/lu";

export default function LinkBadge(
  {
    badgeTitle,
    icon,
    href,
  }: {
    badgeTitle: string,
    icon: any,
    href: string,
  }
) {
  return (
    <Link
      as={Button}
      href={href}
      radius="full"
      className="w-fit bg-white shadow"
      startContent={
        <Image
          src={icon}
          alt={badgeTitle}
          width={24}
          height={24}
          className="min-w-6 w-6"
        />
      }
      endContent={
        <LuExternalLink className="min-w-4 w-4 h-4 shrink-0" />
      }
    >
      <p className="text-sm text-black">{badgeTitle}</p>
    </Link>
  )
}