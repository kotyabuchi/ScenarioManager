import Image from "next/image"
import { getDiscordUser, getUser } from "@/app/lib/data";
import { notFound } from "next/navigation";
import { ScrollShadow } from "@nextui-org/react";
import DiscordIcon from "@/../public/DiscordIcon.svg";
import LinkBadge from "@/app/ui/users/link-badge";

type Props = {
  params: { id: string }
}

const underLineCss = "border-b-2 border-primary-300"

export default async function Page({ params }: Props) {
  const id = params.id
  const user = await getUser(id)
  const userImage = "/noImage.png"

  if (user) {
    const isUpdated = user.createdAt.getTime() !== user.updatedAt.getTime()
    const discordUser = await getDiscordUser(user.discordId)

    return (
      <main className="flex flex-col gap-1 py-4 mx-auto md:max-w-[1080px]">
        <div className="flex flex-row text-sm">
          {
            isUpdated
              ? <p>更新日：</p>
              : <p>登録日：</p>
          }
          <span>{user.updatedAt.toLocaleDateString()}</span>
        </div>
        <div className="flex flex-col gap-4 md:gap-8">
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 w-full mx-auto lg:mx-0">
            <div className="flex flex-col gap-4">
              <Image
                className="relative object-contain z-10 bg-base-200 md:w-full self-center"
                src={user.thumbnailPath || userImage}
                alt={user.name}
                width={144}
                height={144}
                sizes=''
              />
              <div className="hidden md:flex flex-col gap-2">
                <p className={`text-sm w-fit px-1 ${underLineCss}`}>リンク</p>
                <div className="flex flex-col gap-2">
                  {
                    (discordUser.id) && (
                      <LinkBadge
                        badgeTitle={discordUser.global_name}
                        href={`discord://-/users/${discordUser.id}`}
                        icon={DiscordIcon}
                      />
                    )
                  }
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3 w-full">
              <h2 className={`text-3xl break-words break-all w-fit h-fit px-1 ${underLineCss}`}>{user.name}</h2>
              <p className="text-sm whitespace-break-spaces p-4 rounded-xl bg-white">{user.introduction}</p>
              <div className="flex md:hidden flex-col gap-2">
                <p className={`text-sm w-fit px-1 ${underLineCss}`}>リンク</p>
                <div className="flex flex-col gap-2">
                  {
                    (discordUser.id) && (
                      <LinkBadge
                        badgeTitle={discordUser.global_name}
                        href={`discord://-/users/${discordUser.id}`}
                        icon={DiscordIcon}
                      />
                    )
                  }
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h3 className={`text-lg w-fit px-1 ${underLineCss}`}>未プレイ</h3>
              <ScrollShadow orientation="horizontal" className="flex flex-row gap-2 max-w-full h-fit pb-4">
                {
                  [...Array(10)].map((_, i) => {
                    return (
                      <div key={`未プレイ_${i}`} className="flex flex-col gap-1 min-w-fit rounded-lg p-3 bg-white">
                        <p className="text-sm min-w-fit max-w-full self-center">シナリオタイトル</p>
                        <Image
                          className="relative object-contain z-10 bg-base-200 md:w-24 self-center"
                          src={user.thumbnailPath || userImage}
                          alt={user.name}
                          width={144}
                          height={144}
                          sizes=''
                        />
                      </div>
                    )
                  })
                }
              </ScrollShadow>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className={`text-lg w-fit px-1 ${underLineCss}`}>シナリオ保有・KP可</h3>
              <ScrollShadow orientation="horizontal" className="flex flex-row gap-2 max-w-full h-fit pb-4">
                {
                  [...Array(10)].map((_, i) => {
                    return (
                      <div key={`シナリオ保有・KP可_${i}`} className="flex flex-col gap-1 min-w-fit rounded-lg p-3 bg-white">
                        <p className="text-sm min-w-fit max-w-full self-center">シナリオタイトル</p>
                        <Image
                          className="relative object-contain z-10 bg-base-200 md:w-24 self-center"
                          src={user.thumbnailPath || userImage}
                          alt={user.name}
                          width={144}
                          height={144}
                          sizes=''
                        />
                      </div>
                    )
                  })
                }
              </ScrollShadow>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className={`text-lg w-fit px-1 ${underLineCss}`}>プレイ済み・視聴済み</h3>
              <ScrollShadow orientation="horizontal" className="flex flex-row gap-2 max-w-full h-fit pb-4">
                {
                  [...Array(10)].map((_, i) => {
                    return (
                      <div key={`プレイ済み・視聴済み_${i}`} className="flex flex-col gap-1 min-w-fit rounded-lg p-3 bg-white">
                        <p className="text-sm min-w-fit max-w-full self-center">シナリオタイトル</p>
                        <Image
                          className="relative object-contain z-10 bg-base-200 md:w-24 self-center"
                          src={user.thumbnailPath || userImage}
                          alt={user.name}
                          width={144}
                          height={144}
                          sizes=''
                        />
                      </div>
                    )
                  })
                }
              </ScrollShadow>
            </div>
          </div>
        </div>
      </main>
    )
  } else {
    return (notFound())
  }
}