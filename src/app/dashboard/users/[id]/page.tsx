import Image from "next/image"
import { getUser } from "@/app/lib/data";
import { notFound } from "next/navigation";

type Props = {
  params: { id: string }
}

export default async function Page({ params }: Props) {
  const id = params.id
  const user = await getUser(id)
  const userImage = "/noImage.png"

  if (user) {
    const isUpdated = user.createdAt.getTime() !== user.updatedAt.getTime()
    return (
      <main className="flex flex-col gap-8 md:pr-6 py-4">
        <div className="flex flex-col gap-2 md:gap-4">
          <div className="flex flex-row lg:self-end text-sm">
            {
              isUpdated
                ? <p>更新日：</p>
                : <p>登録日：</p>
            }
            <span>{user.updatedAt.toLocaleString()}</span>
          </div>
          <div className="flex flex-col lg:flex-row gap-4">
            <Image
              className="relative object-contain z-10 h-full bg-base-200 md:w-80 self-center"
              src={user.thumbnailPath || userImage}
              alt={user.name}
              width={320}
              height={320}
              sizes=''
            />
            <div className="flex flex-col gap-3">
              <h2 className="text-3xl break-words break-all w-fit border-b-2 border-primary">{user.name}</h2>
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-bold w-fit border-b-2 border-primary">自己紹介</h3>
                <p className="text-sm whitespace-break-spaces block">{user.introduction}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg">未プレイ</h3>
            <div className="flex flex-row gap-4 max-w-full overflow-x-auto">
              div.
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-lg">シナリオ保有・KP可</h3>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-lg">プレイ済み・視聴済み</h3>
          </div>
        </div>
      </main>
    )
  } else {
    return (notFound())
  }
}