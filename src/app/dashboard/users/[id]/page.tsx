import Image from "next/image"
import { getDiscordUser, getUser } from "@/app/lib/data";
import { notFound } from "next/navigation";
import { Avatar, Link, ScrollShadow, Tooltip } from "@nextui-org/react";
import { LuExternalLink } from "react-icons/lu";
import DiscordIcon from "@/../public/DiscordIcon.svg";

type Props = {
  params: { id: string }
}

export default async function Page({ params }: Props) {
  const id = params.id
  const user = await getUser(id)
  const userImage = "/noImage.png"

  if (user) {
    const isUpdated = user.createdAt.getTime() !== user.updatedAt.getTime()
    const discordUser = await getDiscordUser(user.discordId)

    return (
      <main className="flex flex-col gap-1 py-4 md:px-8 lg:px-16">
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
              <Tooltip closeDelay={150} offset={-16}
                content={
                  <Image
                    src={DiscordIcon}
                    alt="discord icon"
                    width={24}
                    height={24}
                  />
                }
              >
                <Link
                  href={`discord://-/users/${discordUser.id}`}
                  className="flex flex-row gap-2 justify-center items-center w-fit border rounded-full p-1 bg-gradient-to-b from-[#7670F0] to-[#5963EB]"
                >
                  <Avatar src={`https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png`} className="w-8 h-8 text-tiny" />
                  <p className="text-white text-sm">{discordUser.global_name}</p>
                  <LuExternalLink className="text-white" />
                </Link>
              </Tooltip>
            </div>
            <div className="flex flex-col gap-3 w-full">
              <h2 className="text-3xl break-words break-all w-fit h-fit border-b-2 border-primary-300">{user.name}</h2>
              <p className="text-sm whitespace-break-spaces p-4 rounded-xl bg-white">{user.introduction}</p>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h3 className="text-lg">未プレイ</h3>
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
              <h3 className="text-lg">シナリオ保有・KP可</h3>
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
              <h3 className="text-lg">プレイ済み・視聴済み</h3>
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