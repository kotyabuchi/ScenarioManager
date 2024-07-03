import RefleshButton from "@/app/ui/RefleshButton";

export default function ErrorAndReload({ message }: { message: string }) {
  return (
    <div className="flex flex-col gap-1 w-full items-center">
      <p className="h-10 text-center font-semibold leading-10">{message}</p>
      <RefleshButton />
    </div>
  );
};
