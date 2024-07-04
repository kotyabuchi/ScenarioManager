'use client'

import { Button } from '@nextui-org/react';
import { useCallback, useState, useTransition } from 'react'
import { toast } from 'sonner';

type LoadMoreAction = (
  query: object | undefined,
  offset: number
) => Promise<readonly [JSX.Element[], number | undefined]>;

export default function ScenarioListClient(
  {
    initialScenarios,
    query,
    pageSize,
    loadMoreAction,
  }: {
    initialScenarios: JSX.Element[],
    query: object | undefined,
    pageSize: number,
    loadMoreAction: LoadMoreAction,
  }) {
  const [scenarios, setScenarios] = useState(initialScenarios);
  const [offset, setOffset] = useState<number | undefined>(initialScenarios.length);
  const [loading, setLoading] = useState(false);
  const [allDataLoaded, setAllDataLoaded] = useState(initialScenarios.length < pageSize);
  const [isPending, startTransition] = useTransition();

  const loadMore = useCallback(async () => {
    setLoading(true);
    try {
      if (offset === undefined) {
        setAllDataLoaded(true);
        setLoading(false);
        return;
      }
      const [newScenarios, next] = await loadMoreAction(query, offset);
      startTransition(() => {
        setScenarios(prev => [...prev, ...newScenarios]);
        setOffset(next);
        if (!next) {
          setAllDataLoaded(true);
          toast.info("全てのシナリオを読み込みました。");
          return;
        }
      });
    } catch (error) {
      console.error(error);
      toast.error("シナリオの読み込みに失敗しました。");
    } finally {
      setLoading(false);
    }
  }, [offset, loadMoreAction, query]);

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full h-full">
        {scenarios}
      </div>
      {
        !allDataLoaded && (
          <Button
            className='w-80 self-center px-12'
            color='primary'
            variant='flat'
            onPress={loadMore}
            isLoading={loading}
            disabled={loading}
          >
            {loading ? "読み込み中..." : "もっと見る"}
          </Button>
        )
      }
    </div>
  )
}