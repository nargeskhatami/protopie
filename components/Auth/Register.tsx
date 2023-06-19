import axios from "axios";

import { Button, InputProps, makeStyles } from "@fluentui/react-components";

import { useState } from "react";
import styled from "styled-components";
import InputLarge from "../Common/Input/InputLarge";
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

  return (
    <Wrapper>
      <InputLarge label="ایمیل" onChange={onChangeEmail} value={email} id="input-email" />

      <InputLarge
        label="نام کاربری"
        onChange={onChangeUsername}
        value={username}
        id="input-username"
      />

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
