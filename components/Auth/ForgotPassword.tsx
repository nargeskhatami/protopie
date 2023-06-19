import axios from "axios";

import { useRouter } from "next/router";
import { Button, Input, Label, InputProps } from "@fluentui/react-components";
import { useState } from "react";
import styled from "styled-components";
import InputLarge from "@/components/Common/Input/InputLarge";

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
};
export default function ForgotPassword(props: Props) {
  const { email, onChangeEmail } = props;

  // const router = useRouter();

  // const reset = async () => {
  //   if (router.query.code)
  //     axios.post("api/reset-password", {
  //       code: router.query.code,
  //       password,
  //       passwordConfirmation: passwordConfirm,
  //     });
  // };

  return (
    <Wrapper>
      <InputLarge label="ایمیل" onChange={onChangeEmail} value={email} id="input-email" />
      {/* <div>
          <Label htmlFor="input-email">Email input</Label>
          <Input onChange={onChangeEmail} value={email} type="email" id="input-email" />
        </div>

        <Button appearance="primary" onClick={forgot}>
          Forgot Pass
        </Button>
      </div>

      <div>
        <div>
          <Label htmlFor="input-password">Password input</Label>
          <Input onChange={onChangePass} value={password} type="password" id="input-password" />
        </div>

        <div>
          <Label htmlFor="input-password-confirm">Confirm Password input</Label>
          <Input
            onChange={onChangePassConfirm}
            value={passwordConfirm}
            type="password"
            id="input-password-confirm"
          />
        </div>

        <Button appearance="primary" onClick={reset}>
          Reset Pass
        </Button> */}
    </Wrapper>
  );
}
