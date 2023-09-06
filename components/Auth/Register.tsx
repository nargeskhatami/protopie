import { Button, makeStyles } from "@fluentui/react-components";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import styled from "styled-components";
import InputLarge from "../Common/Input/InputLarge";

export default function Register() {
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
  } = useFormContext<LoginForm>();

  return (
    <Wrapper>
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <InputLarge
            {...field}
            label="ایمیل"
            error={errors.email?.message as string}
            id="input-email"
          />
        )}
      />
      <Controller
        name="username"
        control={control}
        render={({ field }) => (
          <InputLarge
            {...field}
            label="نام کاربری"
            error={errors.username?.message as string}
            id="input-username"
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <InputLarge
            {...field}
            label="رمز ورود"
            type={showPass ? "text" : "password"}
            id="input-password"
            error={errors.password?.message as string}
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
