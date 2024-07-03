'use client';

import { changePassword } from "@/app/actions/changePassword";
import { PasswordInput } from "@/app/ui/PasswordInput";
import SubmitButton from "@/app/ui/SubmitButton";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useFormState } from "react-dom";
import { LuEyeOff, LuEye } from "react-icons/lu";
import { toast } from "sonner";

export default function SettingForm({ id }: { id: string }) {
  const router = useRouter()
  const [state, dispatch] = useFormState(changePassword, { isSuccess: false });

  const [currentPasswordValue, setCurrentPasswordValue] = useState("");
  const [isCurrentPasswordTouched, setIsCurrentPasswordTouched] = useState(false);

  const [newPasswordValue, setNewPasswordValue] = useState("");
  const [isNewPasswordTouched, setIsNewPasswordTouched] = useState(false);

  const [newPasswordAgainValue, setNewPasswordAgainValue] = useState("");
  const [isNewPasswordAgainTouched, setIsNewPasswordAgainTouched] = useState(false);

  const [isCurrentPasswordVisible, setCurrentPasswordIsVisible] = useState(false);
  const [isNewPasswordVisible, setNewPasswordIsVisible] = useState(false);
  const [isNewPasswordAgainVisible, setNewPasswordAgainIsVisible] = useState(false);
  const toggleCurrentPasswordVisibility = () => setCurrentPasswordIsVisible(!isCurrentPasswordVisible);
  const toggleNewPasswordVisibility = () => setNewPasswordIsVisible(!isNewPasswordVisible);
  const toggleNewPasswordAgainVisibility = () => setNewPasswordAgainIsVisible(!isNewPasswordAgainVisible);

  const isCurrentPassowrdInvalid = useMemo(() => {
    if (!isCurrentPasswordTouched) return false;
    return state.errors?.currentPassword !== undefined || (currentPasswordValue === "");
  }, [state, currentPasswordValue, isCurrentPasswordTouched]);

  const isNewPasswordInvalid = useMemo(() => {
    if (!isNewPasswordTouched) return false;
    return state.errors?.newPassword !== undefined || (newPasswordValue !== newPasswordAgainValue)
  }, [state, isNewPasswordTouched, newPasswordValue, newPasswordAgainValue]);

  const isNewPasswordAgainInvalid = useMemo(() => {
    return isNewPasswordAgainTouched && (newPasswordValue !== newPasswordAgainValue)
  }, [isNewPasswordAgainTouched, newPasswordValue, newPasswordAgainValue]);

  useEffect(() => {
    if (!state) return
    if (state.isSuccess) {
      toast.success("変更に成功しました");
    } else {
      if (state.errors) console.error(JSON.stringify(state.errors));
      if (state.message) {
        toast.error(state.message);
        console.error(state.message);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state])

  useEffect(() => {
    if (state.errors) state.errors.currentPassword = undefined
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPasswordValue])

  useEffect(() => {
    if (state.errors) state.errors.newPassword = undefined
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newPasswordValue])

  return (
    <form action={dispatch} className="flex flex-col gap-6 w-full sm:p-6 sm:rounded-xl sm:border border-zinc-200 bg-zinc-50">
      <input type="hidden" name="id" value={id} />
      <section className="flex flex-col gap-2">
        <h2>パスワード変更</h2>
        <p className="text-xs text-foreground-600">8〜32文字で、大文字、小文字、数字、特殊文字(#?!@$%^&*-)を含む必要があります。</p>
        <PasswordInput
          isRequired
          required
          type={isCurrentPasswordVisible ? "text" : "password"}
          label="現在のパスワード"
          name="currentPassword"
          autoComplete="current-password"
          minLength={8}
          maxLength={32}
          passwordRules="minlength: 6; maxlength: 32; required: lower; required: upper; required: digit; required: [!#$%&*?@^];"
          isInvalid={isCurrentPassowrdInvalid}
          color={isCurrentPassowrdInvalid ? "danger" : "default"}
          errorMessage={state.errors?.currentPassword || "パスワードは必須です。"}
          onValueChange={setCurrentPasswordValue}
          onBlur={() => setIsCurrentPasswordTouched(true)}
          className="w-full"
          classNames={{
            inputWrapper: "after:bg-primary-300"
          }}
          endContent={
            <button className="rounded-full p-[2px] outline-primary-400" type="button" onClick={toggleCurrentPasswordVisibility}>
              {isCurrentPasswordVisible ? (
                <LuEyeOff className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <LuEye className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
        />
        <PasswordInput
          type={isNewPasswordVisible ? "text" : "password"}
          label="新しいパスワード"
          name="newPassword"
          autoComplete="new-password"
          minLength={8}
          maxLength={32}
          passwordRules="minlength: 6; maxlength: 32; required: lower; required: upper; required: digit; required: [!#$%&*?@^];"
          isInvalid={isNewPasswordInvalid}
          color={isNewPasswordInvalid ? "danger" : "default"}
          errorMessage={state.errors?.newPassword || " "}
          onValueChange={setNewPasswordValue}
          onBlur={() => setIsNewPasswordTouched(true)}
          className="w-full"
          classNames={{
            inputWrapper: "after:bg-primary-300"
          }}
          endContent={
            <button className="rounded-full p-[2px] outline-primary-400" type="button" onClick={toggleNewPasswordVisibility}>
              {isNewPasswordVisible ? (
                <LuEyeOff className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <LuEye className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
        />
        <PasswordInput
          type={isNewPasswordAgainVisible ? "text" : "password"}
          label="新しいパスワード(確認)"
          name="newPasswordAgain"
          autoComplete="new-password"
          minLength={8}
          maxLength={32}
          passwordRules="minlength: 6; maxlength: 32; required: lower; required: upper; required: digit; required: [!#$%&*?@^];"
          isInvalid={isNewPasswordAgainInvalid}
          color={isNewPasswordAgainInvalid ? "danger" : "default"}
          errorMessage="パスワードが一致していません。"
          onValueChange={setNewPasswordAgainValue}
          onBlur={() => setIsNewPasswordAgainTouched(true)}
          className="w-full"
          classNames={{
            inputWrapper: "after:bg-primary-300"
          }}
          endContent={
            <button className="rounded-full p-[2px] outline-primary-400" type="button" onClick={toggleNewPasswordAgainVisibility}>
              {isNewPasswordAgainVisible ? (
                <LuEyeOff className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <LuEye className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
        />
        <div className="flex flex-row justify-end">
          <SubmitButton text="変更" className="w-fit" />
        </div>
      </section>
    </form>
  );
};
