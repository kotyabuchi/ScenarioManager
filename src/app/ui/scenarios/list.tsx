'use client'

import { Button } from '@nextui-org/react';
import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { toast } from 'sonner';

type LoadMoreAction = (
  query: object,
  offset: number
) => Promise<readonly [JSX.Element[], number | undefined]>;

export default function ScenarioList(
  {
    children,
    query,
    initialOffset,
    loadMoreAction,
  }: PropsWithChildren<{
    query: object;
    initialOffset: number | undefined;
    loadMoreAction: LoadMoreAction;
  }>
) {
  const [loadMoreNodes, setLoadMoreNodes] = useState<JSX.Element[]>([]);
  const [loading, setLoading] = useState(false);
  const [allDataLoaded, setAllDataLoaded] = useState(initialOffset === undefined);

  // 現在のオフセット
  const currentOffsetRef = useRef<number | undefined>(initialOffset);

  const loadMore = useCallback(async () => {
    setLoading(true);

    setTimeout(async () => {
      // 重複データの取得を防ぐためのチェック
      if (currentOffsetRef.current === undefined) {
        setAllDataLoaded(true);
        setLoading(false);
        return;
      }

      loadMoreAction(query, currentOffsetRef.current)
        .then(([node, next]) => {
          //　新しいデータを追加する
          setLoadMoreNodes((prev) => [...prev, ...node]);
          currentOffsetRef.current = next;
          if (!next) {
            setAllDataLoaded(true);
            toast.info("全てのシナリオを読み込みました。");
            return;
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => setLoading(false));
    }, 800);
  },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [query]
  );

  useEffect(() => {
    setLoadMoreNodes([]);
    setAllDataLoaded(initialOffset === undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full h-full">
        {children}
        {loadMoreNodes}
      </div>
      {
        allDataLoaded || (
          <Button
            className='w-80 self-center px-12'
            color='primary'
            variant='flat'
            onPress={loadMore}
            isLoading={loading}
            disabled={loading}>
            {
              loading
                ? "読み込み中..."
                : "もっと見る"
            }
          </Button>
        )
      }
    </div>
  )
}