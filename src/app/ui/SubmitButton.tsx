'use client';

import { Button } from "@nextui-org/react";
import { useFormStatus } from "react-dom";

export default function SubmitButton({ text }: { text: string }) {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      color="primary"
      isLoading={pending}
      isDisabled={pending}
    >
      {text}
    </Button>
  );
};
