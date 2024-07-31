import RefleshButton from '@/app/ui/RefleshButton';

export default function ErrorAndReload({ message }: { message: string }) {
  return (
    <div className='flex w-full flex-col items-center gap-1'>
      <p className='h-10 text-center font-semibold leading-10'>{message}</p>
      <RefleshButton />
    </div>
  );
}
