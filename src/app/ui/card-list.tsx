'use client'

import {
  PropsWithChildren,
  useCallback,
  useRef,
  useState
} from 'react'

type LoadMoreAction = (
  query: object,
  offset: number
) => Promise<readonly [JSX.Element[], number | null]>;

export default function UserList(
  {
    children,
    query,
    initialOffset,
    loadMoreAction,
  }: PropsWithChildren<{
    query: object,
    initialOffset: number;
    loadMoreAction: LoadMoreAction;
  }>
) {
  const [loadMoreNodes, setLoadMoreNodes] = useState<JSX.Element[]>([]);
  const [loading, setLoading] = useState(false);
  const [allDataLoaded, setAllDataLoaded] = useState(false);

  // 現在のオフセット
  const currentOffsetRef = useRef<number | undefined>(initialOffset);

  const loadMore = useCallback(async () => {
    console.log("start loading")
    setLoading(true);

    setTimeout(async () => {
      // 重複データの取得を防ぐためのチェック
      if (currentOffsetRef.current === undefined) {
        setLoading(false);
        return;
      }

      loadMoreAction(query, currentOffsetRef.current)
        .then(([node, next]) => {
          // 全てのデータを取得したかどうかのチェック
          if (node.length < 10) {
            setAllDataLoaded(true);
          }

          //　新しいデータを追加する
          setLoadMoreNodes((prev) => [...prev, ...node]);
          if (next === null) {
            currentOffsetRef.current = undefined;
            return;
          }

          currentOffsetRef.current = next;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => setLoading(false));
    }, 800);
  },
    [loadMoreAction, query]
  );

  return (
    <div className="flex flex-col gap-y-3 w-full h-full">
      {children}
      {loadMoreNodes}
      {
        <button className='btn w-fit self-center px-12' onClick={loadMore} disabled={allDataLoaded || loading}>
          {loading && (<span className="loading loading-spinner loading-md"></span>)}
          {
            loading
              ? ""
              : "もっと見る"
          }
        </button>
      }
    </div>
  )
}