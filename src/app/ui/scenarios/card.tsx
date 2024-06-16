import Image from 'next/image';
import Link from 'next/link';
import { ScenarioWithTag } from '@/app/lib/data-type';

export default async function ScenarioCard({
  scenario,
}: {
  scenario: ScenarioWithTag
}) {
  const minPlayTimeFull: number = scenario.minPlaytime ?? 0
  const maxPlayTimeFull: number = scenario.maxPlaytime ?? 0
  const minHour: number = Math.ceil(minPlayTimeFull / 60.0)
  const minMinutes: number = Math.ceil(minPlayTimeFull % 60 / 60 * 10) / 10
  const maxHour: number = Math.ceil(maxPlayTimeFull / 60.0)
  const maxMinutes: number = Math.ceil(maxPlayTimeFull % 60 / 60 * 10) / 10
  const minPlayTime = minHour + minMinutes
  const maxPlayTime = maxHour + maxMinutes
  function hoType() {
    switch (scenario.handoutType) {
      case 'NONE': return "なし"
      case 'PUBLIC': return "公開"
      case 'SECRET': return "秘匿"
    }
  }
  const description = scenario.shortDescription ? scenario.shortDescription : scenario.description

  return (
    <Link
      href={`/dashboard/scenarios/${scenario.id}`}
      className="card card-side rounded-2xl h-full bg-base-100 hover-primary hover:text-primary-content duration-150"
    >
      <figure className='shrink-0'>
        <Image
          className="object-cover w-36 h-36"
          src="/noImage.png"
          alt={scenario.name}
          width={144}
          height={144}
          sizes=''
        />
      </figure>
      <div className="card-body gap-1 w-fit px-5 py-4">
        <div className='flex gap-2'>
          {
            scenario.scenarioTag.map((scenarioTag) => {
              return (
                <button key={scenarioTag.tagId} className="badge text-xs border-0" style={{ backgroundColor: `rgb(${scenarioTag.tag.color} / 10%)` }}>{scenarioTag.tag.name}</button>
              )
            })
          }
        </div>
        <h2 className="card-title text-base">{scenario.name}</h2>
        <div className="flex gap-2 text-xs">
          <div>人数：<span className='font-semibold'>{scenario.minPlayer}〜{scenario.maxPlayer}人</span></div>
          <div className="divider divider-horizontal mx-0"></div>
          <div>所要時間：<span className='font-semibold'>{minPlayTime || <></>}〜{maxPlayTime || <></>}時間</span></div>
          <div className="divider divider-horizontal mx-0"></div>
          <div>HO：<span className='font-semibold'>{hoType()}</span></div>
        </div>
        <p className="text-sm opacity-70 line-clamp-2 break-all max-h-14 whitespace-normal">{description}</p>
      </div>
    </Link>
  )
}