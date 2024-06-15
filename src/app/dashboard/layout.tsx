import SideNav from '@/app/ui/sidenav';
import Navbar from '@/app/ui/navbar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex flex-col h-screen'>
      <Navbar />
      <div className="flex h-full flex-col md:flex-row md:overflow-hidden">
        <div className="w-full flex-none md:w-64">
          <SideNav />
        </div>
        <div className="flex-grow pl-6 py-2 md:overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}