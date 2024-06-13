import Image from 'next/image';
import Link from 'next/link';

type Genre = {
  name: string,
  color: string
}

// const isImageFound = async (imageName: string) => {
//   return await fetch(`http://localhost:3000${imageName}`, {
//     method: "HEAD",
//   });
// };

export default async function ScenarioCard({
  name,
  description,
}: {
  name: string;
  description: string;
}) {
  const id: string = "3094092340"
  let image_path: string = "/noImage.png"
  const scenario_image: string = `/${name}.png`
  // const existsImageResult = await isImageFound(scenario_image)
  // if (existsImageResult.status == 200) image_path = scenario_image
  const genres: Genre[] = [
    { name: "クトゥルフ神話(6版)", color: "212 96 59" },
    { name: "新クトゥルフ神話(7版)", color: "60 214 128" },
    { name: "エモクロワ", color: "12 93 158" },
    { name: "パラノイア", color: "115 51 220" }
  ]
  const trpgGenre: Genre = genres[Math.floor(Math.random() * genres.length)]
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

  return (
    <Link
      href={`/dashboard/scenarios/${name}`}
      className="card card-side rounded-2xl h-full bg-base-100 hover-primary hover:text-primary-content duration-150"
    >
      <figure className='shrink-0'>
        <Image
          className="object-cover w-36 h-36"
          src={image_path}
          alt={name}
          width={144}
          height={144}
          sizes=''
        />
      </figure>
      <div className="card-body gap-1 w-fit px-5 py-4">
        <div className='flex gap-2'>
          <button className="badge text-xs border-0">TRPG</button>
          <button className="badge text-xs border-0" style={{ backgroundColor: `rgb(${trpgGenre.color} / 10%)` }}>{trpgGenre.name}</button>
        </div>
        <h2 className="card-title text-base">{name}</h2>
        <div className="flex gap-2 text-xs">
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
        <p className="text-sm opacity-70 line-clamp-2 break-all max-h-14">{description}</p>
      </div>
    </Link>
  )
}