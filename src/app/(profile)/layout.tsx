import AppNavbar from "@/app/ui/navbar";
import { auth } from "@/auth";
import { getUser } from "../lib/data";
import SideNav from "./ui/side-nav";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (session) {
    const user = await getUser(session.user.id)
    if (user) {
      return (
        <div className='flex flex-col h-dvh bg-zinc-50 sm:bg-inherit'>
          <AppNavbar />
          <div className="flex-grow md:overflow-y-auto">
            <div className="flex flex-row py-8 mx-auto md:max-w-[960px]">
              <SideNav />
              {children}
            </div>
          </div>
        </div>
      );
    }
  }
  return (
    <p></p>
  )
};
