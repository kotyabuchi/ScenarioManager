import { auth } from '@/auth';
import ProfileForm from './ui/profile-form';
import { getUserById } from '@/lib/db/user';
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
    const { password, ...passwordLessUser } = await getUserById(
      session.user.id
    );
    return (
      <div className='flex flex-col gap-4 w-full px-6'>
        <h1 className='text-xl'>プロフィール設定</h1>
        <ProfileForm user={passwordLessUser} />
      </div>
    );
  } catch (error) {
    return <ErrorAndReload message='ユーザーが見つかりませんでした。' />;
  }
}
