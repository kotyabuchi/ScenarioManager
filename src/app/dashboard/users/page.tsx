import Image from 'next/image';
import UserCard from "@/app/ui/users/card";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      {/* <div className='flex flex-row flex-wrap justify-start gap-x-4 gap-y-6'> */}
      <div className="flex flex-col gap-y-1 w-full h-full">
        <UserCard name="User Name" />
        <UserCard name="User Name奈wbhどばおwbhんdぽいあwん" />
        <UserCard name="User Name" />
        <UserCard name="User Nameせgfsrgsr" />
        <UserCard name="User Name" />
        <UserCard name="User Name" />
        <UserCard name="User Nameaefsegfse" />
        <UserCard name="User Name" />
        <UserCard name="User Nameawfadgtht" />
        <UserCard name="User Name" />
        <UserCard name="User Namefthft" />
        <UserCard name="User Name" />
      </div>
    </main>
  );
}