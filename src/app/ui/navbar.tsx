'use client';

import React from 'react';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Dropdown, Avatar, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import { usePathname } from 'next/navigation';
import { LuBookOpen, LuHome, LuUsers } from 'react-icons/lu';

export default function AppNavbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    {
      name: "ホーム",
      href: "/dashboard",
      icon: LuHome,
    },
    {
      name: "シナリオ",
      href: "/dashboard/scenarios",
      icon: LuBookOpen,
    },
    {
      name: "ユーザー",
      href: "/dashboard/users",
      icon: LuUsers,
    },
    {
      name: "セッション",
      href: "/dashboard/sessions",
      icon: LuHome,
    },
  ];

  return (
    <Navbar
      maxWidth="full"
      onMenuOpenChange={setIsMenuOpen}
      classNames={{
        base: [
          "bg-slate-100/80",
        ],
        item: [
          "flex",
          "gap-1",
          "h-16",
          "relative",
          "items-center",
          "hover:text-primary",
          "data-[active=true]:after:content-['']",
          "data-[active=true]:after:absolute",
          "data-[active=true]:after:bottom-0",
          "data-[active=true]:after:left-0",
          "data-[active=true]:after:right-0",
          "data-[active=true]:after:h-[2px]",
          "data-[active=true]:after:rounded-[2px]",
          "data-[active=true]:after:bg-primary",
        ],
        menu: [
          "bg-slate-100/80"
        ]
      }}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <p className="font-bold text-lg">シナプレ管理くん</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-2" justify="center">
        {menuItems.map((item, index) => {
          if (index > 3) return
          const isActive = pathname === item.href
          const LinkIcon = item.icon
          return (
            <NavbarItem key={item.href} isActive={isActive}>
              <LinkIcon className={isActive ? "text-primary" : ""} />
              <Link
                color={isActive ? "primary" : "foreground"}
                href={item.href}
                aria-current={isActive ? "page" : undefined
                }>
                {item.name}
              </Link>
            </NavbarItem>
          )
        })}
      </NavbarContent>
      <NavbarContent as="div" justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Jason Hughes"
              size="sm"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="text-xs">プロフィール</p>
              <p className="font-semibold">かぼっち</p>
            </DropdownItem>
            <DropdownItem key="settings">設定</DropdownItem>
            <DropdownItem key="help_and_feedback">ヘルプ & フィードバック</DropdownItem>
            <DropdownItem key="logout" color="danger">
              ログアウト
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item) => {
          const isActive = pathname === item.href
          const LinkIcon = item.icon
          return (
            <NavbarMenuItem key={item.href}>
              <div className={`flex flex-row gap-2 w-fit items-center ${isActive && "border-b border-primary"}`}>
                <LinkIcon className={isActive ? "text-primary" : ""} />
                <Link
                  color={isActive ? "primary" : "foreground"}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined
                  }
                  size="lg"
                >
                  {item.name}
                </Link>
              </div>
            </NavbarMenuItem>
          )
        })}
      </NavbarMenu>
    </Navbar>
  );
}