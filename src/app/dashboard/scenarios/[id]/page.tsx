import Image from "next/image"
import { convertScenarioData, getScenario } from "@/app/lib/data";
import { notFound } from "next/navigation";
import { Divider } from "@nextui-org/react";

type Props = {
  params: { id: string }
}

export default async function Page({ params }: Props) {
  const id = params.id
  const scenario = await getScenario(id)
  const userImage = "/noImage.png"

  if (scenario) {
    const scenarioData = await convertScenarioData(scenario)
    const isUpdated = scenarioData.createdAt.getTime() !== scenarioData.updatedAt.getTime()
    const scenarioTags = scenarioData.scenarioTags

    return (
      <main className="flex flex-col gap-8 py-4 md:px-8 lg:px-16">
        <div className="flex flex-col lg:flex-row gap-4 md:gap-6">
          <div className="shrink-0 flex flex-col gap-1 w-full lg:w-fit lg:h-80 mx-auto lg:mx-0">
            <div className="flex flex-row text-sm">
              {
                isUpdated
                  ? <p>更新日：</p>
                  : <p>投稿日：</p>
              }
              <span>{scenarioData.updatedAt.toLocaleString()}</span>
            </div>
            <Image
              className="relative object-contain z-10 h-full bg-base-200 md:w-80 self-center"
              src={scenarioData.thumbnailPath}
              alt={scenarioData.name}
              width={320}
              height={320}
              sizes=''
            />
          </div>
          <div className="flex flex-col gap-3 w-full">
            <div className="flex flex-col gap-1 text-sm">
              <div className="flex flex-row gap-1">
                {
                  scenarioTags.map((tag) => {
                    return (
                      <span key={tag.id} className="rounded-full min-w-fit px-3 py-[2px] text-xs" style={{ backgroundColor: `${tag.color}` }}>{tag.name}</span>
                    )
                  })
                }
              </div>
              <div className="flex flex-col">
                <h2 className="text-3xl break-words break-all w-fit border-b-2 border-primary-300">{scenarioData.name}</h2>
                <span className='opacity-70'>{scenarioData.author}</span>
              </div>
              <div className="flex flex-col flex-wrap md:flex-row gap-2">
                <div>人数：<span className='font-semibold'>{scenarioData.playerAmount}</span></div>
                <Divider orientation="vertical" />
                <div>所要時間：<span className='font-semibold'>{scenarioData.playtime}</span></div>
                <Divider orientation="vertical" />
                <div>HO：<span className='font-semibold'>{scenarioData.handoutType}</span></div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <input type="checkbox" id="descriptionToggle" className="peer invisible w-0 h-0 -mb-2" />
              <h3 className="text-lg font-bold w-fit border-b-2 border-primary-300">概要</h3>
              <div className="peer-checked:hidden p-4 rounded-xl bg-white">
                <p className="text-sm whitespace-break-spaces line-clamp-[8]">{scenario.shortDescription || scenario.description}</p>
              </div>
              <div className="hidden peer-checked:block p-4 rounded-xl bg-white">
                <p className="text-sm whitespace-break-spaces">{scenario.description || scenario.shortDescription}</p>
              </div>
              <label htmlFor="descriptionToggle" className="w-fit cursor-pointer opacity-70 text-xs peer-checked:hidden">もっと見る</label>
              <label htmlFor="descriptionToggle" className="w-fit cursor-pointer opacity-70 text-xs hidden peer-checked:block">概要を閉じる</label>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4 ">
            <h3 className="text-lg">募集中のセッション</h3>
            <div className="flex flex-row gap-4 max-w-full overflow-x-auto">
              <div className="flex flex-col gap-2 border border-base-200 p-3 rounded-lg w-fit">
                <h4>2024/09/24</h4>
                <p>残り1名</p>
                <p className="leading-relaxed w-full">募集コメント亜jウィdなkwんdぴあじょ；wdjm＠亜wだお＠wdじゃwdなおpwdjなおwd</p>
                <div className="flex flex-row">
                  <div className="flex flex-col">
                    <p>KP:</p>
                    <Image
                      className="object-cover w-12 h-12 rounded-full"
                      src={userImage}
                      alt={"KPユーザー"}
                      width={48}
                      height={48}
                      sizes=''
                    />
                  </div>
                  <div className="divider divider-horizontal m-1"></div>
                  <div className="flex flex-col">
                    <p>PL:</p>
                    <div className="flex flex-row">
                      <Image
                        className="object-cover w-12 h-12 rounded-full border -mr-2"
                        src={userImage}
                        alt={"ユーザー1"}
                        width={48}
                        height={48}
                        sizes=''
                      />
                      <Image
                        className="object-cover w-12 h-12 rounded-full border -mr-2"
                        src={userImage}
                        alt={"ユーザー2"}
                        width={48}
                        height={48}
                        sizes=''
                      />
                      <Image
                        className="object-cover w-12 h-12 rounded-full border"
                        src={userImage}
                        alt={"ユーザー3"}
                        width={48}
                        height={48}
                        sizes=''
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col border border-base-200 p-3 rounded-lg w-fit">
                <h4>2024/09/24</h4>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 ">
            <h3 className="text-lg">シナリオ保有・KP可のユーザー</h3>
          </div>
          <div className="flex flex-col gap-4 ">
            <h3 className="text-lg">未プレイのユーザー</h3>
          </div>
          <div className="flex flex-col gap-4 ">
            <h3 className="text-lg">プレイ済み・視聴済みのユーザー</h3>
          </div>
        </div>
      </main>
    )
  } else {
    return (notFound())
  }
}