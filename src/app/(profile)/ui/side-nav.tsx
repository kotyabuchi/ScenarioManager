'use client';

import { signout } from "@/app/actions/signout";
import { Button, Link } from "@nextui-org/react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

const links = [
  {
    name: "プロフィール",
    href: "/profile",
  },
  {
    name: "設定",
    href: "/setting",
  }
]

async function logout(router: AppRouterInstance) {
  const result = await signout()
  if (result) {
    toast.success("ログアウトしました")
    router.push("/");
    router.refresh();
  } else {
    toast.error("ログアウトに失敗しました")
  }
}

export default function SideNav() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="shrink-0 hidden md:flex gap-1 flex-col min-w-44 h-[1080px] pl-6 mt-10">
      {
        links.map((link) => {
          const isActive = pathname.startsWith(link.href);
          return (
            <Button
              as={Link}
              key={link.href}
              href={link.href}
              color={isActive ? "primary" : "default"}
              variant={isActive ? "flat" : "light"}
              className="justify-start "
            >
              {link.name}
            </Button>
          )
        })
      }
      <Button
        color="danger"
        variant="light"
        className="justify-start"
        onPress={() => logout(router)}
      >
        ログアウト
      </Button>
    </div>
  );
};
