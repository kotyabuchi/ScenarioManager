import Image from 'next/image';
import Link from 'next/link';
import { ScenarioWithTag } from '@/app/lib/data-type';
import { Button, Chip, Tooltip } from '@nextui-org/react';
import { convertScenarioData } from '@/app/lib/data';
import { Clock, FileText, Users } from 'lucide-react';

export default async function ScenarioCard({
  scenario,
}: {
  scenario: ScenarioWithTag
}) {
  const scenarioData = await convertScenarioData(scenario)
  const scenarioTags = scenarioData.scenarioTags

  return (
    <Link
      href={`/dashboard/scenarios/${scenarioData.id}`}
      className="flex flex-row gap-3 w-full h-full p-4 shadow-soft-sm hover:shadow-lg rounded-2xl bg-white duration-150 items-center"
    >
      <figure className='shrink-0 rounded-lg overflow-hidden'>
        <Image
          className="object-cover w-24 h-24 md:w-28 md:h-28"
          src="/noImage.png"
          alt={scenarioData.name}
          width={144}
          height={144}
          sizes=''
        />
      </figure>
      <div className="flex flex-col gap-1 w-fit">
        <div className='flex gap-2'>
          {
            scenarioTags.map((tag) => {
              return (
                <Button
                  key={tag.id}
                  radius="full"
                  variant="ghost"
                  className="rounded-full h-5 min-w-fit px-2 text-xs border"
                >
                  {tag.name}
                </Button>
              )
            })
          }
        </div>
        <div className="flex flex-row flex-wrap gap-y-0 gap-3 items-baseline">
          <h2 className="font-bold text-base line-clamp-1">{scenarioData.name}</h2>
          <span className='text-xs opacity-70'>{scenarioData.author}</span>
        </div>
        <div className="flex flex-wrap gap-x-2 gap-y-1 text-xs">
          <Tooltip content={`プレイ人数: ${scenarioData.playerAmount}`}>
            <Chip startContent={<Users size={14} />} variant="flat" color="primary" size='sm' className='pl-2'>
              {scenarioData.playerAmount}
            </Chip>
          </Tooltip>
          <Tooltip content={`プレイ時間: ${scenarioData.playtime}`}>
            <Chip startContent={<Clock size={14} />} variant="flat" color="secondary" size='sm' className='pl-2'>
              {scenarioData.playtime}
            </Chip>
          </Tooltip>
          <Tooltip content={`ハンドアウト: ${scenarioData.handoutType}`}>
            <Chip startContent={<FileText size={14} />} variant="flat" color="success" size='sm' className='pl-2'>
              {scenarioData.handoutType}
            </Chip>
          </Tooltip>
        </div>
        <p className="text-xs opacity-60 line-clamp-3 break-all max-h-14 whitespace-normal">{scenario.shortDescription || scenarioData.description}</p>
      </div>
    </Link>
  )
}