'use client';

import { Button } from '@nextui-org/react';
import { useFormStatus } from 'react-dom';

export default function SubmitButton({
  className,
  text,
  startContent,
}: {
  className?: string;
  text: string;
  startContent?: React.ReactNode;
}) {
  const { pending } = useFormStatus();
  return (
    <Button
      type='submit'
      color='primary'
      isLoading={pending}
      isDisabled={pending}
      className={className}
      startContent={startContent}
    >
      {text}
    </Button>
  );
}
