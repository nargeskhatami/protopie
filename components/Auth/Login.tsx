import { Button, makeStyles } from "@fluentui/react-components";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import styled from "styled-components";
import ButtonBlock from "../Common/Button/ButtonBlock";
import InputLarge from "../Common/Input/InputLarge";

export default function Login() {
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
      <a href={`${process.env.NEXT_PUBLIC_ADMIN_URL}/api/connect/google`}>
        <ButtonBlock size="large">
          <span>ورود با گوگل</span>
          <svg width={20} height={20}>
            <use href={`/sprite.svg#google`} />
          </svg>
        </ButtonBlock>
      </a>

      <Divider>
        <span>یا</span>
      </Divider>

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
const Divider = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  &:after {
    content: "";
    border: 1px solid var(--colorNeutralStroke3);
    width: 100%;
    position: absolute;
    transform: translateY(-50%);
    top: 50%;
    z-index: -1;
  }
  & span {
    background-color: var(--colorNeutralBackground1);
    padding: 0 var(--spacingHorizontalM);
    color: var(--colorNeutralForeground3);
  }
`;
