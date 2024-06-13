import Link from "next/link";
import {
  LuUser,
  LuLogOut,
} from "react-icons/lu";
import { PiNotePencil } from "react-icons/pi";

const links = [
  {
    name: "マイページ",
    href: "",
    icon: LuUser
  },
  {
    name: "セッションの作成",
    href: "",
    icon: PiNotePencil
  },
  {
    name: "ログアウト",
    href: "",
    icon: LuLogOut
  }
]

export default function ProfileMenu() {
  return (
    <ul className={`dropdown-content z-[1] menu p-2 mt-1 shadow bg-base-200 rounded-box`}>
      {links.map((link) => {
        const LinkIcon = link.icon
        return (
          <li key={link.name}>
            <Link href={link.href}>
              <LinkIcon />
              <p className="max-w-max	whitespace-nowrap">{link.name}</p>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}