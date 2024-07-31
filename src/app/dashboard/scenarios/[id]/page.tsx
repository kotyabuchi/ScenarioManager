import Image from 'next/image';
import { convertScenarioData, getScenario } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Divider, ScrollShadow } from '@nextui-org/react';

type Props = {
  params: { id: string };
};

const underLineCss =
  '[&_h2]:w-fit [&_h2]:px-1 [&_h2]:border-b-2 [&_h2]:border-primary-300 [&_h3]:w-fit [&_h3]:px-1 [&_h3]:border-b-2 [&_h3]:border-primary-300';

export default async function Page({ params }: Props) {
  const id = params.id;
  const scenario = await getScenario(id);
  const userImage = '/noImage.png';

  if (scenario) {
    const scenarioData = await convertScenarioData(scenario);
    const isUpdated =
      scenarioData.createdAt.getTime() !== scenarioData.updatedAt.getTime();
    const scenarioTags = scenarioData.scenarioTags;

    return (
      <main
        className={`mx-auto flex max-w-[1080px] flex-col gap-8 py-4 ${underLineCss}`}
      >
        <div className='flex flex-col gap-4 md:gap-6 lg:flex-row'>
          <div className='mx-auto flex w-full shrink-0 flex-col gap-1 lg:mx-0 lg:h-80 lg:w-fit'>
            <div className='flex flex-row text-sm'>
              {isUpdated ? <p>更新日：</p> : <p>投稿日：</p>}
              <span>{scenarioData.updatedAt.toLocaleString()}</span>
            </div>
            <Image
              className='bg-base-200 relative z-10 h-full self-center object-contain md:w-80'
              src={scenarioData.thumbnailPath}
              alt={scenarioData.name}
              width={320}
              height={320}
              sizes=''
            />
          </div>
          <div className='flex w-full flex-col gap-2'>
            <div className='flex flex-col'>
              <div className='flex flex-row gap-1 px-1 text-sm'>
                {scenarioTags.map((tag) => {
                  return (
                    <span
                      key={tag.id}
                      className='min-w-fit rounded-full px-3 py-[2px] text-xs'
                      style={{ backgroundColor: `${tag.color}` }}
                    >
                      {tag.name}
                    </span>
                  );
                })}
              </div>
              <div className='flex flex-col'>
                <h2 className='break-words break-all text-3xl'>
                  {scenarioData.name}
                </h2>
                <span className='px-1 text-sm opacity-70'>
                  {scenarioData.author}
                </span>
              </div>
            </div>
            <div className='flex flex-col flex-wrap px-1 text-sm md:flex-row md:gap-2 [&>Divider]:hidden [&>Divider]:md:block [&_span]:font-semibold'>
              <div>
                人数：<span>{scenarioData.playerAmount}</span>
              </div>
              <Divider orientation='vertical' />
              <div>
                所要時間：<span>{scenarioData.playtime}</span>
              </div>
              <Divider orientation='vertical' />
              <div>
                HO：<span>{scenarioData.handoutType}</span>
              </div>
            </div>
            <div className='flex flex-col gap-2'>
              <input
                type='checkbox'
                id='descriptionToggle'
                className='peer invisible -mb-2 h-0 w-0'
              />
              <h3 className='text-lg font-bold'>概要</h3>
              <div className='rounded-xl bg-white p-4 peer-checked:hidden'>
                <p className='line-clamp-[8] whitespace-break-spaces text-sm'>
                  {scenario.shortDescription || scenario.description}
                </p>
              </div>
              <div className='hidden rounded-xl bg-white px-4 peer-checked:block md:max-h-[480px]'>
                <ScrollShadow className='max-h-full whitespace-break-spaces py-4 text-sm'>
                  {scenario.description || scenario.shortDescription}
                </ScrollShadow>
              </div>
              <label
                htmlFor='descriptionToggle'
                className='w-fit cursor-pointer px-1 text-xs opacity-70 peer-checked:hidden'
              >
                もっと見る
              </label>
              <label
                htmlFor='descriptionToggle'
                className='hidden w-fit cursor-pointer px-1 text-xs opacity-70 peer-checked:block'
              >
                概要を閉じる
              </label>
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-6'>
          <div className='flex flex-col gap-4'>
            <h3 className='text-lg'>募集中のセッション</h3>
            <div className='flex max-w-full flex-row gap-4 overflow-x-auto'>
              <div className='border-base-200 flex w-fit flex-col gap-2 rounded-lg border p-3'>
                <h4>2024/09/24</h4>
                <p>残り1名</p>
                <p className='w-full leading-relaxed'>
                  募集コメント亜jウィdなkwんdぴあじょ；wdjm＠亜wだお＠wdじゃwdなおpwdjなおwd
                </p>
                <div className='flex flex-row'>
                  <div className='flex flex-col'>
                    <p>KP:</p>
                    <Image
                      className='h-12 w-12 rounded-full object-cover'
                      src={userImage}
                      alt={'KPユーザー'}
                      width={48}
                      height={48}
                      sizes=''
                    />
                  </div>
                  <div className='divider divider-horizontal m-1'></div>
                  <div className='flex flex-col'>
                    <p>PL:</p>
                    <div className='flex flex-row'>
                      <Image
                        className='-mr-2 h-12 w-12 rounded-full border object-cover'
                        src={userImage}
                        alt={'ユーザー1'}
                        width={48}
                        height={48}
                        sizes=''
                      />
                      <Image
                        className='-mr-2 h-12 w-12 rounded-full border object-cover'
                        src={userImage}
                        alt={'ユーザー2'}
                        width={48}
                        height={48}
                        sizes=''
                      />
                      <Image
                        className='h-12 w-12 rounded-full border object-cover'
                        src={userImage}
                        alt={'ユーザー3'}
                        width={48}
                        height={48}
                        sizes=''
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className='border-base-200 flex w-fit flex-col rounded-lg border p-3'>
                <h4>2024/09/24</h4>
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-4'>
            <h3 className='text-lg'>シナリオ保有・KP可のユーザー</h3>
          </div>
          <div className='flex flex-col gap-4'>
            <h3 className='text-lg'>未プレイのユーザー</h3>
          </div>
          <div className='flex flex-col gap-4'>
            <h3 className='text-lg'>プレイ済み・視聴済みのユーザー</h3>
          </div>
        </div>
      </main>
    );
  } else {
    return notFound();
  }
}
