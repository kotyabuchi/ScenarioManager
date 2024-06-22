import { Button } from '@nextui-org/react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-2">
      <h2 className="text-xl font-semibold">404 Not Found</h2>
      <p>ユーザーが見つかりませんでした。</p>
      <Button
        as={Link}
        href="/dashboard/users"
        color='primary'
        variant='flat'
        className='mt-4'
      >
        一覧に戻る
      </Button>
    </main>
  );
}