import axios from "axios";

import { Button, InputProps, makeStyles } from "@fluentui/react-components";
import { useState } from "react";
import ButtonBlock from "../Common/Button/ButtonBlock";
import InputLarge from "../Common/Input/InputLarge";
import styled from "styled-components";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

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

type Props = {
  email: string;
  onChangeEmail: Function;
  password: string;
  onChangePassword: Function;
};

export default function Login(props: Props) {
  const { email, onChangeEmail, password, onChangePassword } = props;

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

      <InputLarge label="ایمیل" onChange={onChangeEmail} value={email} id="input-username" />
      <InputLarge
        label="رمز ورود"
        onChange={onChangePassword}
        value={password}
        type={showPass ? "text" : "password"}
        id="input-password"
        contentAfter={togglerBtn}
      />
    </Wrapper>
  );
}
