export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex-grow p-4 md:overflow-y-auto md:p-6 md:pt-2'>
      {children}
    </div>
  );
}
