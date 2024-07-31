'use client';

import { updateUser } from '@/app/actions/updateUser';
import SubmitButton from '@/app/ui/SubmitButton';
import { Button, Input, Textarea, Image, Link } from '@nextui-org/react';
import { ImageUp } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useFormState } from 'react-dom';
import { toast } from 'sonner';

export interface PasswordLessUser {
  id: string;
  discordId: string;
  name: string;
  introduction: string | null;
  thumbnailPath: string | null;
}

export default function ProfileForm({ user }: { user: PasswordLessUser }) {
  const session = useSession();
  const router = useRouter();
  const [state, dispatch] = useFormState(updateUser, { isSuccess: false });

  const inputFile = useRef<HTMLInputElement | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<string | undefined>(
    undefined,
  );

  const [usernameValue, setUsernameValue] = useState(user.name);
  const [isUsernameTouched, setIsUsernameIdTouched] = useState(false);

  const [discordIdValue, setDiscordIdValue] = useState(user.discordId);
  const [isDiscordIdTouched, setIsDiscordIdTouched] = useState(false);

  const [introductionValue, setIntroductionValue] = useState(
    user.introduction || '',
  );

  const userImage = user.thumbnailPath || '/default_avatar.png';

  const onThumbnailFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) setThumbnailFile(window.URL.createObjectURL(file));
  };

  const isUsernameInvalid = useMemo(() => {
    if (!isUsernameTouched) return false;
    return state.errors?.username !== undefined || usernameValue === '';
  }, [state.errors, usernameValue, isUsernameTouched]);

  const isDiscordIdInvalid = useMemo(() => {
    if (!isDiscordIdTouched) return false;
    return state.errors?.discordId !== undefined || discordIdValue === '';
  }, [state.errors, discordIdValue, isDiscordIdTouched]);

  useEffect(() => {
    if (!state) return;
    if (state.isSuccess) {
      if (state.newData) session.update(state.newData);
      toast.success('変更に成功しました');
      router.push('/profile');
      router.refresh();
    } else if (state.message) {
      toast.error(state.message);
      console.log(state.errors);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  useEffect(() => {
    if (state.errors) state.errors.discordId = undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [discordIdValue]);

  return (
    <form
      action={dispatch}
      className='flex w-full flex-col gap-6 border-zinc-200 bg-zinc-50 sm:rounded-xl sm:border sm:p-6'
    >
      <input type='hidden' name='id' value={user.id} />
      <div className='flex w-full flex-col gap-6 sm:flex-row'>
        <div className='flex flex-col items-center gap-3'>
          <Image
            className='relative h-36 min-h-36 w-36 min-w-36 shrink-0 rounded-full border-3 border-zinc-200 object-cover'
            src={thumbnailFile || userImage}
            alt={`${user.name}のサムネイル`}
            width={144}
            height={144}
          />
          <Button
            variant='ghost'
            size='sm'
            className='w-fit'
            onPress={() => {
              inputFile?.current?.click();
            }}
          >
            <ImageUp className='h-4 w-4' />
            ファイルを選択
          </Button>
          <input
            type='file'
            name='thumbnail'
            id='thumbnail'
            ref={inputFile}
            className='hidden'
            onChange={onThumbnailFileChange}
          />
        </div>
        <div className='flex w-full flex-col gap-3'>
          <Input
            required
            isRequired
            type='text'
            label='ユーザー名'
            name='username'
            placeholder='ユーザー名を入力してください。'
            value={usernameValue}
            isInvalid={isUsernameInvalid}
            color={isUsernameInvalid ? 'danger' : 'default'}
            errorMessage={state.errors?.username || 'ユーザー名は必須です。'}
            onValueChange={setUsernameValue}
            onBlur={() => setIsUsernameIdTouched(true)}
          />
          <Input
            required
            isRequired
            type='text'
            label='DiscordID'
            name='discordId'
            placeholder='DiscordIDを入力してください。'
            value={discordIdValue}
            isInvalid={isDiscordIdInvalid}
            color={isDiscordIdInvalid ? 'danger' : 'default'}
            errorMessage={state.errors?.discordId || 'DiscordIDは必須です。'}
            onValueChange={setDiscordIdValue}
            onBlur={() => setIsDiscordIdTouched(true)}
          />
          <p className='text-xs'>
            ※DiscordIDの見つけ方は
            <Link
              href='https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID#h_01HRSTXPS5H5D7JBY2QKKPVKNA'
              target='_blank'
              className='text-xs'
            >
              こちら
            </Link>
          </p>
        </div>
      </div>
      <Textarea
        label='自己紹介'
        name='introduction'
        placeholder='自己紹介がまだ設定されていません。'
        value={introductionValue}
        onValueChange={setIntroductionValue}
      />
      <div className='flex w-full flex-row justify-end gap-4'>
        <Button as={Link} href='/profile' color='danger' variant='light'>
          キャンセル
        </Button>
        <SubmitButton text='保存' />
      </div>
    </form>
  );
}
