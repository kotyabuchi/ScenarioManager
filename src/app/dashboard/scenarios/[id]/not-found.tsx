import { Button, Link } from '@nextui-org/react';

export default function NotFound() {
  return (
    <main className='flex h-full flex-col items-center justify-center gap-2'>
      <h2 className='text-xl font-semibold'>404 Not Found</h2>
      <p>シナリオが見つかりませんでした。</p>
      <Button
        as={Link}
        href='/dashboard/scenarios'
        color='primary'
        variant='flat'
        className='mt-4'
      >
        一覧に戻る
      </Button>
    </main>
  );
}
