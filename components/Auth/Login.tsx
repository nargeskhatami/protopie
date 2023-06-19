import axios from "axios";

import { InputProps } from "@fluentui/react-components";
import { useState } from "react";
import ButtonBlock from "../Common/Button/ButtonBlock";
import InputLarge from "../Common/Input/InputLarge";
import styled from "styled-components";

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
export default function Login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const onChangeUsername: InputProps["onChange"] = (ev, data) => {
    setIdentifier(data.value);
  };
  const onChangePass: InputProps["onChange"] = (ev, data) => {
    setPassword(data.value);
  };

  const login = () => {
    axios
      .post("api/login", {
        identifier,
        password,
      })
      .then((response) => {
        console.log("User logged in:", response.data.user);
        console.log("User token:", response.data.jwt);
      })
      .catch((error) => {
        console.log("An error occurred:", error.response);
      });
  };
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

      <InputLarge
        label="ایمیل"
        onChange={onChangeUsername}
        value={identifier}
        id="input-username"
      />
      <InputLarge
        label="رمز ورود"
        onChange={onChangePass}
        value={password}
        type="password"
        id="input-password"
      />
    </Wrapper>
  );
}
