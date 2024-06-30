import AppNavbar from '@/app/ui/navbar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex flex-col max-h-dvh'>
      <AppNavbar />
      <div className="flex-grow p-4 md:p-6 md:pt-2 md:overflow-y-auto">{children}</div>
    </div>
  );
}