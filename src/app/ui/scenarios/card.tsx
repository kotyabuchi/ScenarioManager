import Image from 'next/image';
import Link from 'next/link';
import { Button, Chip, Tooltip } from '@nextui-org/react';
import { Clock, FileText, Users } from 'lucide-react';
import { ScenarioWithTags } from '@/lib/db/dao/scenarioDao';

export default async function ScenarioCard({
  scenario,
}: {
  scenario: ScenarioWithTags;
}) {
  const scenarioTags = scenario.scenarioTags;

  const playerAmount =
    !scenario.minPlayer && !scenario.maxPlayer
      ? 'なし'
      : scenario.minPlayer === scenario.maxPlayer
        ? `${scenario.minPlayer}人`
        : scenario.minPlayer && !scenario.maxPlayer
          ? `${scenario.minPlayer}人～`
          : !scenario.minPlayer && scenario.maxPlayer
            ? `～${scenario.maxPlayer}人`
            : `${scenario.minPlayer}人～${scenario.maxPlayer}人`;

  const playtime =
    !scenario.minPlaytime && !scenario.maxPlaytime
      ? 'なし'
      : scenario.minPlaytime === scenario.maxPlaytime
        ? `${scenario.minPlaytime}分`
        : scenario.minPlaytime && !scenario.maxPlaytime
          ? `${scenario.minPlaytime}分～`
          : !scenario.minPlaytime && scenario.maxPlaytime
            ? `～${scenario.maxPlaytime}分`
            : `${scenario.minPlaytime}分～${scenario.maxPlaytime}分`;

  return (
    <Link
      href={`/dashboard/scenarios/${scenario.id}`}
      className='flex h-full w-full flex-row items-center gap-3 rounded-2xl bg-white p-4 duration-150 hover:shadow-soft-md'
    >
      <figure className='shrink-0 overflow-hidden rounded-lg'>
        <Image
          className='h-24 w-24 object-cover md:h-28 md:w-28'
          src='/noImage.png'
          alt={scenario.name}
          width={144}
          height={144}
          sizes=''
        />
      </figure>
      <div className='flex w-fit flex-col gap-1'>
        <div className='flex gap-2'>
          {scenarioTags.map((tag) => {
            return (
              <Button
                key={tag.id}
                radius='full'
                variant='ghost'
                className='h-5 min-w-fit rounded-full border px-2 text-xs'
              >
                {tag.name}
              </Button>
            );
          })}
        </div>
        <div className='flex flex-row flex-wrap items-baseline gap-3 gap-y-0'>
          <h2 className='line-clamp-1 text-base font-bold'>{scenario.name}</h2>
          <span className='text-xs opacity-70'>{scenario.author}</span>
        </div>
        <div className='flex flex-wrap gap-x-2 gap-y-1 text-xs'>
          <Tooltip content={`プレイ人数: ${playerAmount}`}>
            <Chip
              startContent={<Users size={14} />}
              variant='flat'
              color='primary'
              size='sm'
              className='pl-2'
            >
              {playerAmount}
            </Chip>
          </Tooltip>
          <Tooltip content={`プレイ時間: ${playtime}`}>
            <Chip
              startContent={<Clock size={14} />}
              variant='flat'
              color='secondary'
              size='sm'
              className='pl-2'
            >
              {playtime}
            </Chip>
          </Tooltip>
          <Tooltip content={`ハンドアウト: ${scenario.handoutType}`}>
            <Chip
              startContent={<FileText size={14} />}
              variant='flat'
              color='success'
              size='sm'
              className='pl-2'
            >
              {scenario.handoutType}
            </Chip>
          </Tooltip>
        </div>
        <p className='line-clamp-3 max-h-14 whitespace-normal break-all text-xs opacity-60'>
          {scenario.shortDescription || scenario.description}
        </p>
      </div>
    </Link>
  );
}
