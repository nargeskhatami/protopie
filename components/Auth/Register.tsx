import { Button, makeStyles } from "@fluentui/react-components";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import styled from "styled-components";
import InputLarge from "../Common/Input/InputLarge";

type Props = {
  email: string;
  onChangeEmail: Function;
  username: string;
  onChangeUsername: Function;
  password: string;
  onChangePassword: Function;
};

export default function Register(props: Props) {
  const { email, onChangeEmail, username, onChangeUsername, password, onChangePassword } = props;

  const styles = useStyles();

  const [showPass, setShowPass] = useState(false);

  const togglePass = () => {
    const toggle = !showPass;
    setShowPass(toggle);
  };

  const togglerBtn = (
    <Button
      onClick={togglePass}
      appearance="transparent"
      size="small"
      className={styles.passToggleBtn}
    >
      {showPass ? <EyeIcon height={20} /> : <EyeSlashIcon height={20} />}
    </Button>
  );

  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Wrapper>
      <Controller
        name="email"
        rules={{ required: "ایمیل اجباری است" }}
        control={control}
        render={({ field }) => (
          <InputLarge
            {...field}
            label="ایمیل"
            onChange={onChangeEmail}
            value={email}
            error={errors.email?.message}
            id="input-email"
          />
        )}
      />
      <Controller
        name="username"
        rules={{ required: "نام کاربری اجباری است" }}
        control={control}
        render={({ field }) => (
          <InputLarge
            {...field}
            label="نام کاربری"
            onChange={onChangeUsername}
            value={username}
            error={errors.username?.message}
            id="input-username"
          />
        )}
      />
      <Controller
        name="password"
        rules={{ required: "رمز ورود اجباری است" }}
        control={control}
        render={({ field }) => (
          <InputLarge
            {...field}
            label="رمز ورود"
            onChange={onChangePassword}
            value={password}
            type={showPass ? "text" : "password"}
            id="input-password"
            error={errors.password?.message}
            contentAfter={togglerBtn}
          />
        )}
      />
    </Wrapper>
  );
}

const useStyles = makeStyles({
  passToggleBtn: {
    paddingLeft: 0,
    paddingRight: 0,
    width: "fit-content",
    minWidth: "fit-content",
  },
});

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: var(--spacingVerticalXXL) 0;
  padding: var(--spacingVerticalXXL) 0;
`;
