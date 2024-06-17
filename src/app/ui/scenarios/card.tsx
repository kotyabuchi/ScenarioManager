import Image from 'next/image';
import Link from 'next/link';
import { ScenarioWithTag } from '@/app/lib/data-type';

export default async function ScenarioCard({
  scenario,
}: {
  scenario: ScenarioWithTag
}) {
  const minPlayer = scenario.minPlayer
  const maxPlayer = scenario.maxPlayer

  const playerAmount = (maxPlayer)
    ? `${minPlayer || ""}〜${maxPlayer || ""}人`
    : (minPlayer)
      ? `${minPlayer}人以上`
      : `なし`

  const minPlayTimeFull: number = scenario.minPlaytime ?? 0
  const maxPlayTimeFull: number = scenario.maxPlaytime ?? 0
  const minHour: number = Math.ceil(minPlayTimeFull / 60.0)
  const minMinutes: number = Math.ceil(minPlayTimeFull % 60 / 60 * 10) / 10
  const maxHour: number = Math.ceil(maxPlayTimeFull / 60.0)
  const maxMinutes: number = Math.ceil(maxPlayTimeFull % 60 / 60 * 10) / 10
  const minPlayTime = minHour + minMinutes
  const maxPlayTime = maxHour + maxMinutes

  const playtime = (maxPlayTime)
    ? `${minPlayTime || ""}〜${maxPlayTime || ""}時間`
    : (minPlayTime)
      ? `${minPlayTime}時間以上`
      : `なし`

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
      className="card card-side items-end h-full rounded-lg bg-base-100 hover-primary hover:text-primary-content duration-150"
    >
      <figure className='shrink-0'>
        <Image
          className="object-cover w-24 h-24 md:w-28 md:h-28 m-4"
          src="/noImage.png"
          alt={scenario.name}
          width={144}
          height={144}
          sizes=''
        />
      </figure>
      <div className="card-body gap-1 w-fit p-0 m-4 ml-0">
        <div className='flex gap-2'>
          {
            scenario.scenarioTag.map((scenarioTag) => {
              return (
                <button key={scenarioTag.tagId} className="badge text-xs border-0" style={{ backgroundColor: `${scenarioTag.tag.color}` }}>
                  {scenarioTag.tag.name}
                </button>
              )
            })
          }
        </div>
        <div className="flex flex-row flex-wrap gap-y-0 gap-3 items-baseline">
          <h2 className="card-title text-base">{scenario.name}</h2>
          <span className='text-xs opacity-70'>{scenario.author}</span>
        </div>
        <div className="flex flex-wrap md:gap-x-2 gap-y-1 text-xs">
          <div className='flex md:flex-row'><p>人数：</p><span className='font-semibold'>{playerAmount}</span></div>
          <div className="divider divider-horizontal mx-0"></div>
          <div className='flex md:flex-row'><p>所要時間：</p><span className='font-semibold'>{playtime}</span></div>
          <div className="divider divider-horizontal mx-0"></div>
          <div className='flex md:flex-row'><p>HO：</p><span className='font-semibold'>{hoType()}</span></div>
        </div>
        <p className="text-sm opacity-70 line-clamp-2 break-all max-h-14 whitespace-normal">{description}</p>
      </div>
    </Link>
  )
}