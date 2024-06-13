import Image from 'next/image';

export default function UserCard({
  name,
}: {
  name: string
}) {
  return (
    <div className="card card-side rounded-2xl p-3 h-full w-full bg-base-100 hover-primary hover:text-primary-content duration-150 cursor-pointer">
      <figure className='shrink-0 rounded-xl'>
        <Image
          className="object-cover w-20 h-20 bg-base-200"
          src="/default_avatar.png"
          alt={name}
          width={80}
          height={80}
          sizes=''
        />
      </figure>
      <div className="card-body gap-1 h-20 w-full px-4 py-[6px]">
        <h2 className="card-title text-base">{name}</h2>
        <p className='text-sm opacity-70 line-clamp-2 max-h-14 w-auto break-words break-all'>無wんぢあんw断wぢなwpdな日dなpdぽあmw助dじゃおpwjm°派mwpdんマpんwmd派にwだ日wmdぴあmんwdなpwぢないんfgrjgsprじょ派wmd派wんdイアpwん義pm派wmdパオwんフィパンwぴ</p>
      </div>
    </div>
  )
}