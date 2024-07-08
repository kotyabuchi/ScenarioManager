'use client';

import { Button } from '@nextui-org/react';
import { useCallback, useState, useTransition } from 'react';
import { toast } from 'sonner';

type LoadMoreAction = (
  query: object | undefined,
  offset: number
) => Promise<readonly [JSX.Element[], number | undefined]>;

export default function UserListClient({
  initialUsers,
  query,
  pageSize,
  loadMoreAction,
}: {
  initialUsers: JSX.Element[];
  query: object | undefined;
  pageSize: number;
  loadMoreAction: LoadMoreAction;
}) {
  const [users, setUsers] = useState(initialUsers);
  const [offset, setOffset] = useState<number | undefined>(initialUsers.length);
  const [loading, setLoading] = useState(false);
  const [allDataLoaded, setAllDataLoaded] = useState(
    initialUsers.length < pageSize
  );
  const [isPending, startTransition] = useTransition();

  const loadMore = useCallback(async () => {
    setLoading(true);
    try {
      if (offset === undefined) {
        setAllDataLoaded(true);
        setLoading(false);
        return;
      }
      const [newUsers, next] = await loadMoreAction(query, offset);
      startTransition(() => {
        setUsers((prev) => [...prev, ...newUsers]);
        setOffset(next);
        if (!next) {
          setAllDataLoaded(true);
          toast.info('全てのユーザーを読み込みました。');
          return;
        }
      });
    } catch (error) {
      console.error(error);
      toast.error('ユーザーの読み込みに失敗しました。');
    } finally {
      setLoading(false);
    }
  }, [offset, loadMoreAction, query]);

  return (
    <div className='flex flex-col gap-3'>
      {users.length > 0 ? (
        <div className='grid grid-cols-user-list gap-4 w-full h-full'>
          {users}
        </div>
      ) : (
        <div className='flex flex-col gap-1 w-full items-center'>
          <p className='h-10 text-center font-semibold leading-10'>
            一致するユーザーが見つかりませんでした。
          </p>
        </div>
      )}
      {!allDataLoaded && (
        <Button
          className='w-80 self-center px-12'
          color='primary'
          variant='flat'
          onPress={loadMore}
          isLoading={loading}
          disabled={loading}
        >
          {loading ? '読み込み中...' : 'もっと見る'}
        </Button>
      )}
    </div>
  );
}
