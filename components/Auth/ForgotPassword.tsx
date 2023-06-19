import axios from "axios";

import { useRouter } from "next/router";
import { Button, Input, Label, InputProps } from "@fluentui/react-components";
import { useState } from "react";

export default function ForgotPassword() {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();
  
  const onChangePass: InputProps["onChange"] = (ev, data) => {
    setPassword(data.value);
  };
  const onChangePassConfirm: InputProps["onChange"] = (ev, data) => {
    setPasswordConfirm(data.value);
  };
  const onChangeEmail: InputProps["onChange"] = (ev, data) => {
    setEmail(data.value);
  };

  const forgot = async () => {
    axios.post("api/forgot-password", {
      email,
    });
  };

  const reset = async () => {
    if (router.query.code)
      axios.post("api/reset-password", {
        code: router.query.code,
        password,
        passwordConfirmation: passwordConfirm,
      });
  };

  return (
    <>
      <div>
        <div>
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
        </Button>
      </div>
    </>
  );
}
