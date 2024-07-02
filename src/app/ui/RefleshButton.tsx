'use client';

import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function RefleshButton() {
  const router = useRouter()
  return (
    <Button
      color="primary"
      onClick={router.refresh}
      className="w-fit"
    >
      再読み込み
    </Button>
  )
};
