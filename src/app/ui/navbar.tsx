'use client';

import { Key, useState } from 'react';
import { usePathname } from 'next/navigation';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Dropdown,
  Avatar,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
  Image,
  DropdownSection,
  Button,
} from '@nextui-org/react';
import { signout } from '@/app/actions/signout';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import {
  BookOpen,
  CircleHelp,
  House,
  LogOut,
  MessageSquareMore,
  Notebook,
  Settings,
  UsersRound,
} from 'lucide-react';
import { Session } from 'next-auth';

export default function AppNavbar({ session }: { session: Session | null }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [update, setUpdate] = useState(true);

  const menuItems = [
    {
      name: 'ホーム',
      href: '/dashboard',
      icon: House,
    },
    {
      name: 'シナリオ',
      href: '/dashboard/scenarios',
      icon: BookOpen,
    },
    {
      name: 'ユーザー',
      href: '/dashboard/users',
      icon: UsersRound,
    },
    {
      name: 'セッション',
      href: '/dashboard/sessions',
      icon: Notebook,
    },
  ];

  const menuItemAction = async (key: Key) => {
    if (key.toString() === 'signout') {
      const result = await signout();
      if (result) {
        toast.success('ログアウトしました');
        router.push('/');
        router.refresh();
        setUpdate(update ? false : true);
      } else {
        toast.error('ログアウトに失敗しました');
      }
    } else {
      router.push(`/${key}`);
    }
  };

  return (
    <Navbar
      isBordered
      maxWidth='full'
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      classNames={{
        base: ['bg-zinc-50', 'sm:bg-zinc-50/80', 'h-14'],
        item: [
          'flex',
          'gap-1',
          'h-14',
          'relative',
          'items-center',
          'hover:text-primary',
          "data-[active=true]:after:content-['']",
          'data-[active=true]:after:absolute',
          'data-[active=true]:after:bottom-0',
          'data-[active=true]:after:left-0',
          'data-[active=true]:after:right-0',
          'data-[active=true]:after:h-[2px]',
          'data-[active=true]:after:rounded-[2px]',
          'data-[active=true]:after:bg-primary',
        ],
        menu: ['bg-zinc-50'],
      }}
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className='sm:hidden'
        />
        <NavbarBrand>
          <Link href='/' color='foreground'>
            <p className='ml-2 text-lg font-bold'>シナプレ管理くん</p>
            <Image
              className='relative h-10 min-h-10 w-10 min-w-10 shrink-0 object-cover'
              src='/mascot.png'
              alt='サイトコンセプトキャラ'
              width={40}
              height={40}
            />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className='hidden gap-2 sm:flex' justify='center'>
        {session &&
          menuItems.map((item, index) => {
            if (index > 3) return;
            const isActive = pathname === item.href;
            const LinkIcon = item.icon;
            return (
              <NavbarItem key={item.href} isActive={isActive}>
                <LinkIcon
                  size={18}
                  className={isActive ? 'text-primary' : ''}
                />
                <Link
                  color={isActive ? 'primary' : 'foreground'}
                  href={item.href}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.name}
                </Link>
              </NavbarItem>
            );
          })}
      </NavbarContent>
      <NavbarContent as='div' justify='end'>
        {session ? (
          <Dropdown placement='bottom-end'>
            <DropdownTrigger>
              <Avatar
                isBordered
                as='button'
                className='bg-slate-50 transition-transform'
                name={session?.user.name || 'セッション取得中...'}
                size='sm'
                src={session?.user.thumbnailPath || '/default_avatar.png'}
              />
            </DropdownTrigger>
            <DropdownMenu
              aria-label='Profile Actions'
              variant='flat'
              onAction={menuItemAction}
            >
              <DropdownSection title='プロフィール' showDivider>
                <DropdownItem
                  key='profile'
                  className='h-10 gap-2'
                  textValue='プロフィールリンク'
                >
                  <p className='font-semibold'>
                    {session?.user.name || 'セッション取得中...'}
                  </p>
                </DropdownItem>
              </DropdownSection>
              <DropdownItem
                key='setting'
                startContent={<Settings size={18} />}
                textValue='設定リンク'
              >
                設定
              </DropdownItem>
              <DropdownItem
                key='help'
                startContent={<CircleHelp size={18} />}
                textValue='ヘルプリンク'
              >
                ヘルプ
              </DropdownItem>
              <DropdownItem
                key='feedback'
                startContent={<MessageSquareMore size={18} />}
                textValue='フィードバックリンク'
              >
                フィードバック
              </DropdownItem>
              <DropdownItem
                key='signout'
                color='danger'
                className='text-danger'
                startContent={<LogOut size={18} />}
                textValue='ログアウトボタン'
              >
                ログアウト
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          <>
            <NavbarItem className='hidden lg:flex'>
              <Button as={Link} href='/signin' variant='light'>
                ログイン
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button as={Link} color='primary' href='/signup' variant='flat'>
                アカウント登録
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>
      <NavbarMenu>
        {session &&
          menuItems.map((item) => {
            const isActive = pathname === item.href;
            const LinkIcon = item.icon;
            return (
              <NavbarMenuItem key={item.href}>
                <div
                  className={`flex w-fit flex-row items-center gap-2 ${
                    isActive && 'border-b border-primary'
                  }`}
                >
                  <LinkIcon className={isActive ? 'text-primary' : ''} />
                  <Link
                    color={isActive ? 'primary' : 'foreground'}
                    href={item.href}
                    aria-current={isActive ? 'page' : undefined}
                    onPress={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </div>
              </NavbarMenuItem>
            );
          })}
      </NavbarMenu>
    </Navbar>
  );
}
