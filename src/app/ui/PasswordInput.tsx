import { Input, InputProps } from "@nextui-org/react";

interface PasswordInputProps extends InputProps {
  passwordRules?: string;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({ passwordRules, ...props }) => {
  return (
    <Input
      {...props}
      ref={(input) => {
        if (input && passwordRules) {
          input.setAttribute('passwordrules', passwordRules);
        }
      }}
    />
  );
};