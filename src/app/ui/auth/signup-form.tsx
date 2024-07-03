'use client';

import { Input, Link } from "@nextui-org/react";
import { useEffect, useMemo, useState } from "react";
import { toast } from 'sonner';
import { signUp, State } from "@/app/actions/signup";
import { useFormState } from "react-dom";
import { PasswordInput } from "../PasswordInput";
import * as z from 'zod';
import { useRouter } from "next/navigation";
import SubmitButton from "../SubmitButton";
import { Eye, EyeOff } from "lucide-react";

export default function SignupForm() {
  const router = useRouter();
  const initialState: State = { isSuccess: false, message: null, errors: {} };
  const [state, dispatch] = useFormState(signUp, initialState);

  const [usernameValue, setUsernameValue] = useState("");
  const [isUsernameTouched, setIsUserNameTouched] = useState(false);

  const [discordIdValue, setdiscordIdValue] = useState("");
  const [isDiscordIdTouched, setIsDiscordIdTouched] = useState(false);

  const [passwordValue, setPasswordValue] = useState("");
  const [isPasswordTouched, setIsPasswordTouched] = useState(false);

  const [passwordAgainValue, setPasswordAgainValue] = useState("");
  const [isPasswordAgainTouched, setIsPasswordAgainTouched] = useState(false);

  const [isPasswordVisible, setPasswordIsVisible] = useState(false);
  const [isPasswordAgainVisible, setPasswordAgainIsVisible] = useState(false);
  const togglePasswordVisibility = () => setPasswordIsVisible(!isPasswordVisible);
  const togglePasswordAgainVisibility = () => setPasswordAgainIsVisible(!isPasswordAgainVisible);

  const passwordSchema = z.string()
    .min(8, { message: "8文字以上で入力してください" })
    .max(32, { message: "32文字以内で入力してください" })
    .regex(/[0-9]+/, { message: "数字を1文字以上使用してください" })
    .regex(/[#?!@$%^&*-]+/, { message: "記号(#?!@$%^&*-)の中で1文字以上使用してください" })
    .regex(/[a-z]+/, { message: "英小文字を1文字以上使用してください" })
    .regex(/[A-Z]+/, { message: "英大文字を1文字以上使用してください" })

  const isUsernameInvalid = useMemo(() => {
    if (!isUsernameTouched) return false;
    return state.errors?.username !== undefined || usernameValue === "";
  }, [state, usernameValue, isUsernameTouched]);

  const isDiscordIdInvalid = useMemo(() => {
    if (!isDiscordIdTouched) return false;
    return state.errors?.discordId !== undefined || discordIdValue === "";
  }, [state, discordIdValue, isDiscordIdTouched])

  const isPassowrdInvalid = useMemo(() => {
    if (!isPasswordTouched) return undefined;
    const validCheck = passwordSchema.safeParse(passwordValue).error?.issues.map((issue) => issue.message)
    return validCheck || state.errors?.password;
  }, [state, isPasswordTouched, passwordSchema, passwordValue]);

  const isPassowrdAgainInvalid = useMemo(() => {
    if (!isPasswordAgainTouched) return false;
    return state.errors?.password !== undefined || passwordAgainValue === "" || (isPasswordTouched && passwordValue != passwordAgainValue);
  }, [state, passwordValue, passwordAgainValue, isPasswordTouched, isPasswordAgainTouched]);

  useEffect(() => {
    if (state.message) {
      if (state.isSuccess) {
        toast.success(state.message)
        router.push("/signin");
      } else {
        toast.error(state.message)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state])

  useEffect(() => {
    state.errors.discordId = undefined
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [discordIdValue])

  useEffect(() => {
    state.errors.password = undefined
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [passwordValue])

  return (
    <form action={dispatch} className="flex flex-col w-full gap-4">
      <Input
        isRequired
        required
        type="text"
        variant="underlined"
        label="ユーザー名"
        name="username"
        autoComplete="username"
        isInvalid={isUsernameInvalid}
        color={isUsernameInvalid ? "danger" : "default"}
        errorMessage="ユーザー名は必須です。"
        onValueChange={setUsernameValue}
        onBlur={() => setIsUserNameTouched(true)}
        className="w-full"
        classNames={{
          inputWrapper: "after:bg-primary-300"
        }}
      />
      <Input
        isRequired
        required
        type="text"
        label="DiscordID"
        name="discordId"
        variant="underlined"
        isInvalid={isDiscordIdInvalid}
        color={isDiscordIdInvalid ? "danger" : "default"}
        errorMessage={state.errors?.discordId || "DiscordIDは必須です。"}
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
        autoComplete="new-password"
        minLength={8}
        maxLength={32}
        passwordRules="minlength: 6; maxlength: 32; required: lower; required: upper; required: digit; required: [!#$%&*?@^];"
        isInvalid={isPassowrdInvalid !== undefined}
        color={isPassowrdInvalid ? "danger" : "default"}
        errorMessage={isPassowrdInvalid && (<p className="whitespace-break-spaces">{isPassowrdInvalid.join("\n")}</p>)}
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
      <PasswordInput
        isRequired
        required
        type={isPasswordAgainVisible ? "text" : "password"}
        variant="underlined"
        label="パスワード(確認)"
        name="confirm-password"
        autoComplete="new-password"
        minLength={8}
        maxLength={32}
        isInvalid={isPassowrdAgainInvalid}
        color={isPassowrdAgainInvalid ? "danger" : "default"}
        errorMessage={state.errors?.password ? "" : "パスワードが一致しません。"}
        onValueChange={setPasswordAgainValue}
        onBlur={() => setIsPasswordAgainTouched(true)}
        className="w-full"
        classNames={{
          inputWrapper: "after:bg-primary-300"
        }}
        endContent={
          <button className="rounded-full p-[2px] outline-primary-400" type="button" onClick={togglePasswordAgainVisibility}>
            {isPasswordAgainVisible ? (
              <Eye className="text-2xl text-default-400 pointer-events-none" />
            ) : (
              <EyeOff className="text-2xl text-default-400 pointer-events-none" />
            )}
          </button>
        }
      />
      <p className="text-xs">※DiscordIDの見つけ方は<Link href="https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID#h_01HRSTXPS5H5D7JBY2QKKPVKNA" target="_blank" className="text-xs">こちら</Link></p>
      {
        !state.isSuccess && state.message && (<p className="text-danger text-xs text-center">{`*${state.message}`}</p>)
      }
      <SubmitButton text="登録" />
    </form>
  )
}