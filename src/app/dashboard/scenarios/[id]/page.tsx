import Image from "next/image"

type Props = {
  params: { id: string }
}

const isImageFound = async (imageName: string) => {
  return await fetch(`http://localhost:3000${imageName}`, {
    method: "HEAD",
  });
};

export default async function Page({ params }: Props) {
  const name = params.id
  let imagePath: string = "/noImage.png"
  const scenarioImage: string = `/${name}.png`
  const existsImageResult = await isImageFound(scenarioImage)
  if (existsImageResult.status == 200) imagePath = scenarioImage

  const genres = [
    "TRPG", "クトゥルフ神話(6版)"
  ]

  const minPlayer: number = Math.floor(Math.random() * 4) + 1
  const maxPlayer: number = Math.floor(Math.random() * 4) + minPlayer + 1
  const minPlayTime: number = Math.floor(Math.random() * 300)
  const maxPlayTime: number = Math.floor(Math.random() * 420) + minPlayTime
  const minHour: number = Math.ceil(minPlayTime / 60.0)
  const minMinutes: number = Math.ceil(minPlayTime % 60 / 60 * 10) / 10
  const maxHour: number = Math.ceil(maxPlayTime / 60.0)
  const maxMinutes: number = Math.ceil(maxPlayTime % 60 / 60 * 10) / 10
  const hasHO: boolean = Math.random() > 0.8
  const secretHO: boolean = Math.random() > 0.5
  const description = `―あなたたちは、互いが互いを想い合う家族だ。これは、とある幸せな家族の話である。
探索者たちは関東地方のとある県にある「多楽津町(たらづちょう)」という街にてひとつ屋根の下で暮らす4人家族である。

【時代設定】
現代日本(季節設定は任意)

【推奨人数】
4人固定

【推奨技能】
目星、図書館、応急手当or医学

【プレイ時間】
ボイスセッション6時間前後
※情報秘匿の度合いによって大きく変わります。

【PL向け注意事項】
ロスト率高め（50％）
HO 別秘匿情報あり
シナリオの動き次第ではPvPの可能性あり`

  return (
    <main className="flex flex-col gap-8">
      <div className="flex flex-col gap-4 md:flex-row">
        <Image
          className="object-contain w-full h-full p-8 bg-base-200 md:w-80 md:h-80 md:p-0"
          src={imagePath}
          alt={name}
          width={320}
          height={320}
          sizes=''
        />
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl break-words break-all">{name}</h2>
          <div className="flex flex-row gap-2 text-sm">
            {genres.map((genre) => {
              return (<button key={genre} className="badge border-0 bg-emerald-200">{genre}</button>)
            })}
          </div>
          <div className="flex flex-col md:flex-row gap-2 text-sm">
            <div>人数：<span className='font-semibold'>{minPlayer}〜{maxPlayer}人</span></div>
            <div className="divider divider-horizontal mx-0"></div>
            <div>所要時間：<span className='font-semibold'>{minHour + minMinutes}〜{maxHour + maxMinutes}時間</span></div>
            <div className="divider divider-horizontal mx-0"></div>
            <div>HO：<span className='font-semibold'>{hasHO
              ? secretHO
                ? (<>秘匿</>)
                : (<>公開</>)
              : (<>なし</>)
            }</span></div>
          </div>
          <div>
            <h3 className="text-xl font-bold">概要</h3>
            <p className="whitespace-break-spaces">{description}</p>
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
                    src={imagePath}
                    alt={name}
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
                      src={imagePath}
                      alt={name}
                      width={48}
                      height={48}
                      sizes=''
                    />
                    <Image
                      className="object-cover w-12 h-12 rounded-full border -mr-2"
                      src={imagePath}
                      alt={name}
                      width={48}
                      height={48}
                      sizes=''
                    />
                    <Image
                      className="object-cover w-12 h-12 rounded-full border"
                      src={imagePath}
                      alt={name}
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
}