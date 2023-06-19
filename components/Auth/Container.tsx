import { useState } from "react";

import ButtonBlock from "../Common/Button/ButtonBlock";

import {
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogContent,
  DialogBody,
  DialogActions,
  Button,
  makeStyles,
  InputProps,
} from "@fluentui/react-components";
import styled from "styled-components";
import Login from "./Login";
import Register from "./Register";
import ForgotPassword from "./ForgotPassword";
import axios from "axios";

const useCustomDialogStyles = makeStyles({
  surface: {
    width: "960px",
    maxWidth: "960px",
  },
  title: {
    textAlign: "center",
    fontWeight: "var(--fontWeightBold)",
    fontSize: "var(--fontSizeBase600)",
    width: "100%",
    paddingBottom: "var(--spacingVerticalM)",
  },
  content: {
    width: "100%",
  },
  body: {
    display: "block",
  },
  actions: {
    flexDirection: "column",
    rowGap: "0",
    "> button": {
      marginBottom: "var(--spacingVerticalMNudge)",
    },
  },
  linkButton: {
    alignSelf: "flex-start",
    marginBottom: "var(--spacingVerticalXXL) !important",
  },
});

const DialogContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  & > div {
    flex: 0 0 calc(50% - 24px);
  }
`;
const SubHeader = styled.span`
  text-align: center;
  display: block;
  padding-bottom: var(--spacingHorizontalXXL);
`;

const SampleImg = styled.div`
  width: 100%;
  height: 630px;
  background: white;
  border-radius: 16px;
`;

type AuthComponent = "Register" | "Login" | "ForgotPassword";

export default function AuthDialog() {
  const [title, setTitle] = useState("ورود");
  const [actionButtonText, setActionButtonText] = useState("ورود");
  const [authComponent, setAuthComponent] = useState<AuthComponent>("Login");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const onChangeEmail: InputProps["onChange"] = (ev, data) => {
    setEmail(data.value);
  };
  const onChangeUsername: InputProps["onChange"] = (ev, data) => {
    setUsername(data.value);
  };
  const onChangePassword: InputProps["onChange"] = (ev, data) => {
    setPassword(data.value);
  };
  const onChangePassConfirm: InputProps["onChange"] = (ev, data) => {
    setPasswordConfirm(data.value);
  };

  const customDialogStyles = useCustomDialogStyles();

  const changeAuthComponent = (component: AuthComponent | null = null) => {
    if (!component) component = authComponent === "Login" ? "Register" : "Login";

    switch (component) {
      case "Login":
        setTitle("ورود");
        setActionButtonText("ورود");
        break;
      case "Register":
        setTitle("ثبت نام با ایمیل");
        setActionButtonText("ثبت نام");
        break;
      case "ForgotPassword":
        setTitle("بازیابی رمز ورود");
        setActionButtonText("ارسال لینک بازیابی");
        break;
    }

    setAuthComponent(component);
  };

  const login = (identifier: string, password: string) => {
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

  const register = (username: string, email: string, password: string) => {
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

  const forgotPass = (email: string) => {
    axios.post("api/forgot-password", {
      email,
    });
  };

  const submitForm = (email: string, password: string, username: string) => {
    if (authComponent === "Login") {
      login(email, password);
    } else if (authComponent === "Register") {
      register(username, email, password);
    } else {
      forgotPass(email);
    }
  };

  return (
    <Dialog>
      <DialogTrigger disableButtonEnhancement>
        <Button>Open dialog</Button>
      </DialogTrigger>

      <DialogSurface className={customDialogStyles.surface}>
        <DialogContentWrapper>
          <SampleImg></SampleImg>
          <DialogBody className={customDialogStyles.body}>
            <DialogTitle className={customDialogStyles.title}>{title}</DialogTitle>
            <SubHeader>
              {authComponent === "ForgotPassword"
                ? "لطفا ایمیل خود را وارد نمایید."
                : "با یکی از دو روش زیر می‌توانید وارد شوید."}
            </SubHeader>
            <DialogContent className={customDialogStyles.content}>
              {authComponent === "Login" && (
                <Login
                  email={email}
                  onChangeEmail={onChangeEmail}
                  password={password}
                  onChangePassword={onChangePassword}
                />
              )}
              {authComponent === "Register" && (
                <Register
                  password={password}
                  onChangePassword={onChangePassword}
                  username={username}
                  onChangeUsername={onChangeUsername}
                  email={email}
                  onChangeEmail={onChangeEmail}
                />
              )}
              {authComponent === "ForgotPassword" && (
                <ForgotPassword email={email} onChangeEmail={onChangeEmail} />
              )}
            </DialogContent>
            <DialogActions className={customDialogStyles.actions}>
              {authComponent === "Login" && (
                <Button
                  appearance="transparent"
                  size="large"
                  className={customDialogStyles.linkButton}
                  onClick={() => changeAuthComponent("ForgotPassword")}
                >
                  بازیابی رمز ورود
                </Button>
              )}
              <ButtonBlock appearance="primary" size="large">
                {actionButtonText}
              </ButtonBlock>
              <ButtonBlock
                appearance="transparent"
                size="large"
                onClick={() => changeAuthComponent(null)}
              >
                {authComponent === "Login" ? "ثبت نام" : "بازگشت"}
              </ButtonBlock>
            </DialogActions>
          </DialogBody>
        </DialogContentWrapper>
      </DialogSurface>
    </Dialog>
  );
}
