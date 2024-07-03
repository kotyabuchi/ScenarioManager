'use client';

import { Input, Link } from "@nextui-org/react";
import { Suspense, useEffect, useMemo, useState } from "react";
import { toast } from 'sonner';
import { useFormState } from "react-dom";
import { PasswordInput } from "../PasswordInput";
import { authenticate } from "@/app/actions/signin";
import { useRouter, useSearchParams } from "next/navigation";
import SubmitButton from "../SubmitButton";
import { Eye, EyeOff } from "lucide-react";

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
            <button className="rounded-full p-[2px] outline-primary-400" type="button" onClick={togglePasswordVisibility}>
              {isPasswordVisible ? (
                <Eye className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <EyeOff className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
        />
        <p className="text-xs">※DiscordIDの見つけ方は<Link href="https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID#h_01HRSTXPS5H5D7JBY2QKKPVKNA" target="_blank" className="text-xs">こちら</Link></p>
        <SubmitButton text="ログイン" />
      </form>
    </Suspense>
  )
}