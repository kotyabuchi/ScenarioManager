import Image from 'next/image';
import Link from 'next/link';
import { ScenarioWithTag } from '@/lib/data-type';
import { Button, Chip, Tooltip } from '@nextui-org/react';
import { convertScenarioData } from '@/lib/data';
import { Clock, FileText, Users } from 'lucide-react';

export default async function ScenarioCard({
  scenario,
}: {
  scenario: ScenarioWithTag;
}) {
  const scenarioData = await convertScenarioData(scenario);
  const scenarioTags = scenarioData.scenarioTags;

  return (
    <Link
      href={`/dashboard/scenarios/${scenarioData.id}`}
      className='flex h-full w-full flex-row items-center gap-3 rounded-2xl bg-white p-4 duration-150 hover:shadow-soft-md'
    >
      <figure className='shrink-0 overflow-hidden rounded-lg'>
        <Image
          className='h-24 w-24 object-cover md:h-28 md:w-28'
          src='/noImage.png'
          alt={scenarioData.name}
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
          <h2 className='line-clamp-1 text-base font-bold'>
            {scenarioData.name}
          </h2>
          <span className='text-xs opacity-70'>{scenarioData.author}</span>
        </div>
        <div className='flex flex-wrap gap-x-2 gap-y-1 text-xs'>
          <Tooltip content={`プレイ人数: ${scenarioData.playerAmount}`}>
            <Chip
              startContent={<Users size={14} />}
              variant='flat'
              color='primary'
              size='sm'
              className='pl-2'
            >
              {scenarioData.playerAmount}
            </Chip>
          </Tooltip>
          <Tooltip content={`プレイ時間: ${scenarioData.playtime}`}>
            <Chip
              startContent={<Clock size={14} />}
              variant='flat'
              color='secondary'
              size='sm'
              className='pl-2'
            >
              {scenarioData.playtime}
            </Chip>
          </Tooltip>
          <Tooltip content={`ハンドアウト: ${scenarioData.handoutType}`}>
            <Chip
              startContent={<FileText size={14} />}
              variant='flat'
              color='success'
              size='sm'
              className='pl-2'
            >
              {scenarioData.handoutType}
            </Chip>
          </Tooltip>
        </div>
        <p className='line-clamp-3 max-h-14 whitespace-normal break-all text-xs opacity-60'>
          {scenario.shortDescription || scenarioData.description}
        </p>
      </div>
    </Link>
  );
}
