import axios from "axios";

import { Button, Input, Label, InputProps } from "@fluentui/react-components";
import { useState } from "react";

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
    <div>
      <a href={`${process.env.NEXT_PUBLIC_ADMIN_URL}/api/connect/google`}>
        <button style={{ width: "150px" }}>login to google</button>
      </a>
      <div>
        <Label htmlFor="input-username">Username input</Label>
        <Input onChange={onChangeUsername} value={identifier} id="input-username" />
      </div>

      <div>
        <Label htmlFor="input-password">Password input</Label>
        <Input onChange={onChangePass} value={password} type="password" id="input-password" />
      </div>

      <Button appearance="primary" onClick={login}>
        Login
      </Button>
    </div>
  );
}
