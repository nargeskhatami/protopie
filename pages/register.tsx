import axios from "axios";

import { Button, Input, Label, InputProps } from "@fluentui/react-components";

import { useState } from "react";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChangeUsername: InputProps["onChange"] = (ev, data) => {
    setUsername(data.value);
  };
  const onChangeEmail: InputProps["onChange"] = (ev, data) => {
    setEmail(data.value);
  };
  const onChangePass: InputProps["onChange"] = (ev, data) => {
    setPassword(data.value);
  };

  const register = () => {
    axios
      .post("api/register", {
        username,
        email,
        password,
      })
      .then((response) => {
        console.log("User registered:", response.data.user);
        console.log("User token:", response.data.jwt);
      })
      .catch((error) => {
        console.log("An error occurred:", error.response);
      });
  };

  return (
    <div>
      <div>
        <Label htmlFor="input-email">Email input</Label>
        <Input onChange={onChangeEmail} value={email} type="email" id="input-email" />
      </div>

      <div>
        <Label htmlFor="input-username">Username input</Label>
        <Input onChange={onChangeUsername} value={username} id="input-username" />
      </div>

      <div>
        <Label htmlFor="input-password">Password input</Label>
        <Input onChange={onChangePass} value={password} type="password" id="input-password" />
      </div>

      <Button appearance="primary" onClick={register}>
        Register
      </Button>
    </div>
  );
}
