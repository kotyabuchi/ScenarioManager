import { auth } from '@/auth';
import ProfileForm from './ui/profile-form';
import { getUser } from '@/lib/db/dao/userDao';
import { Metadata } from 'next';
import ErrorAndReload from '../../ui/error-and-reload';

export const metadata: Metadata = {
  title: 'プロフィール編集',
};

export default async function Page() {
  const session = await auth();
  if (session === null)
    return <ErrorAndReload message='セッションが見つかりませんでした。' />;
  try {
    const user = await getUser(session.user.id);
    if (!user) {
      return <></>;
    }
    return (
      <div className='flex w-full flex-col gap-4 px-6'>
        <h1 className='text-xl'>プロフィール設定</h1>
        <ProfileForm user={user} />
      </div>
    );
  } catch (error) {
    return <ErrorAndReload message='ユーザーが見つかりませんでした。' />;
  }
}
