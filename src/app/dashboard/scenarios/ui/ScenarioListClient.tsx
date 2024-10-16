'use client';

import { ScenarioQuery } from '@/lib/db/dao/scenarioDao';
import { Button } from '@nextui-org/react';
import { useCallback, useState, useTransition } from 'react';
import { toast } from 'sonner';

type LoadMoreAction = (
  query: ScenarioQuery | undefined,
  offset: number,
) => Promise<readonly [JSX.Element[], number | undefined]>;

export default function ScenarioListClient({
  initialScenarios,
  query,
  pageSize,
  loadMoreAction,
}: {
  initialScenarios: JSX.Element[];
  query: object | undefined;
  pageSize: number;
  loadMoreAction: LoadMoreAction;
}) {
  const [scenarios, setScenarios] = useState(initialScenarios);
  const [offset, setOffset] = useState<number | undefined>(
    initialScenarios.length,
  );
  const [loading, setLoading] = useState(false);
  const [allDataLoaded, setAllDataLoaded] = useState(
    initialScenarios.length < pageSize,
  );
  const [_, startTransition] = useTransition();

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
        setScenarios((prev) => [...prev, ...newScenarios]);
        setOffset(next);
        if (!next) {
          setAllDataLoaded(true);
          toast.info('全てのシナリオを読み込みました。');
          return;
        }
      });
    } catch (error) {
      console.error(error);
      toast.error('シナリオの読み込みに失敗しました。');
    } finally {
      setLoading(false);
    }
  }, [offset, loadMoreAction, query]);

  return (
    <div className='flex flex-col gap-3'>
      {scenarios.length > 0 ? (
        <div className='grid h-full w-full grid-cols-1 gap-4 xl:grid-cols-2'>
          {scenarios}
        </div>
      ) : (
        <div className='flex w-full flex-col items-center gap-1'>
          <p className='h-10 text-center font-semibold leading-10'>
            一致するシナリオが見つかりませんでした。
          </p>
          {/* <Button color='primary'>シナリオを登録する</Button> */}
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
