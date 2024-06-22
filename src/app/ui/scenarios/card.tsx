import Image from 'next/image';
import Link from 'next/link';
import { ScenarioWithTag } from '@/app/lib/data-type';
import { Button, Divider } from '@nextui-org/react';
import { convertScenarioData } from '@/app/lib/data';

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
      className="flex flex-row gap-3 w-full h-full p-3 shadow-md rounded-2xl bg-white hover:bg-primary-50 duration-150"
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
                  variant="flat"
                  className="rounded-full h-5 min-w-fit px-3 text-xs"
                  style={{ backgroundColor: tag.color || undefined }}
                >
                  {tag.name}
                </Button>
              )
            })
          }
        </div>
        <div className="flex flex-row flex-wrap gap-y-0 gap-3 items-baseline">
          <h2 className="font-bold text-base">{scenarioData.name}</h2>
          <span className='text-xs opacity-70'>{scenarioData.author}</span>
        </div>
        <div className="flex flex-wrap md:gap-x-2 gap-y-1 text-xs">
          <div className='flex md:flex-row'><p>人数：</p><span className='font-semibold'>{scenarioData.playerAmount}</span></div>
          <Divider orientation="vertical" />
          <div className='flex md:flex-row'><p>所要時間：</p><span className='font-semibold'>{scenarioData.playtime}</span></div>
          <Divider orientation="vertical" />
          <div className='flex md:flex-row'><p>HO：</p><span className='font-semibold'>{scenarioData.handoutType}</span></div>
        </div>
        <p className="text-xs opacity-60 line-clamp-2 break-all max-h-14 whitespace-normal">{scenario.shortDescription || scenarioData.description}</p>
      </div>
    </Link>
  )
}