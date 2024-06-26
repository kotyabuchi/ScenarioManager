'use client';

import { Button, Input, Link } from "@nextui-org/react";
import { Suspense, useEffect, useMemo, useState } from "react";
import { LuEye, LuEyeOff, LuHelpCircle } from "react-icons/lu";
import { toast } from 'sonner';
import { useFormState, useFormStatus } from "react-dom";
import { PasswordInput } from "../PasswordInput";
import { authenticate } from "@/app/actions/signin";
import { useRouter, useSearchParams } from "next/navigation";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      color="primary"
      isLoading={pending}
      isDisabled={pending}
    >
      ログイン
    </Button>
  );
}

export default function SigninForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';

  const [state, dispatch] = useFormState(authenticate, undefined);

  const [discordIdValue, setdiscordIdValue] = useState("");
  const [isDiscordIdTouched, setIsDiscordIdTouched] = useState(false);

  const [passwordValue, setPasswordValue] = useState("");
  const [isPasswordTouched, setIsPasswordTouched] = useState(false);

  const [isPasswordVisible, setPasswordIsVisible] = useState(false);
  const togglePasswordVisibility = () => setPasswordIsVisible(!isPasswordVisible);

  const isDiscordIdInvalid = useMemo(() => {
    return isDiscordIdTouched && discordIdValue === "";
  }, [discordIdValue, isDiscordIdTouched])

  const isPassowrdInvalid = useMemo(() => {
    return isPasswordTouched && (passwordValue === "");
  }, [passwordValue, isPasswordTouched]);

  useEffect(() => {
    if (!state) return
    if (state.success) {
      toast.success("ログインに成功しました")
      router.push(callbackUrl);
      router.refresh();
    } else {
      toast.error(state.error)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state])

  return (
    <Suspense>
      <form action={dispatch} className="flex flex-col w-full gap-4">
        <Input
          isRequired
          required
          type="text"
          label="DiscordID"
          name="discordId"
          variant="underlined"
          isInvalid={isDiscordIdInvalid}
          color={isDiscordIdInvalid ? "danger" : "default"}
          errorMessage="DiscordIDは必須です。"
          onValueChange={setdiscordIdValue}
          onBlur={() => setIsDiscordIdTouched(true)}
          className="w-full"
          classNames={{
            inputWrapper: "after:bg-primary-300"
          }}
          endContent={
            <Link href="https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID#h_01HRSTXPS5H5D7JBY2QKKPVKNA" target="_blank" color="foreground"><LuHelpCircle className="text-2xl text-default-400" /></Link>
          }
        />
        <PasswordInput
          isRequired
          required
          type={isPasswordVisible ? "text" : "password"}
          variant="underlined"
          description="8〜32文字で、大文字、小文字、数字、特殊文字(#?!@$%^&*-)を含む必要があります。"
          label="パスワード"
          name="password"
          autoComplete="current-password"
          minLength={8}
          maxLength={32}
          passwordRules="minlength: 6; maxlength: 32; required: lower; required: upper; required: digit; required: [!#$%&*?@^];"
          isInvalid={isPassowrdInvalid}
          color={isPassowrdInvalid ? "danger" : "default"}
          errorMessage="パスワードは必須です。"
          onValueChange={setPasswordValue}
          onBlur={() => setIsPasswordTouched(true)}
          className="w-full"
          classNames={{
            inputWrapper: "after:bg-primary-300"
          }}
          endContent={
            <button className="focus:outline-none" type="button" onClick={togglePasswordVisibility}>
              {isPasswordVisible ? (
                <LuEyeOff className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <LuEye className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
        />
        <SubmitButton />
      </form>
    </Suspense>
  )
}