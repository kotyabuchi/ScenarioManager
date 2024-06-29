export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex h-dvh flex-col items-center justify-center">
      <div className="flex flex-col gap-10 items-center justify-center h-dvh md:h-fit w-full md:max-w-md p-8 bg-white md:rounded-xl shadow-soft-sm text-slate-800">{children}</div>
    </main>
  )
}