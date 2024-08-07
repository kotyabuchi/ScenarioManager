import { auth } from '@/auth';
import { getUser } from '../../lib/data';
import SideNav from './ui/side-nav';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (session) {
    const user = await getUser(session.user.id);
    if (user) {
      return (
        <div className='max-h-full flex-grow md:overflow-y-auto'>
          <div className='flex flex-row py-6'>
            <SideNav />
            {children}
          </div>
        </div>
      );
    }
  }
  return <p></p>;
}
