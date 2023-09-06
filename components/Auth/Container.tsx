import { loginShema } from "@/helpers/validations/auth";
import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
  makeStyles,
} from "@fluentui/react-components";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import styled from "styled-components";
import Button from "../Common/Button/Button";
import ButtonBlock from "../Common/Button/ButtonBlock";
import ForgotPassword from "./ForgotPassword";
import Login from "./Login";
import Register from "./Register";

export default function AuthDialog() {
  const [title, setTitle] = useState("ورود");
  const [submitButtonText, setActionButtonText] = useState("ورود");
  const customDialogStyles = useCustomDialogStyles();

  const formMethods = useForm<LoginForm>({
    resolver: yupResolver(loginShema),
    mode: "onTouched",
    defaultValues: {
      component: "Login",
      email: "",
      password: "",
      username: "",
    },
  });
  const { watch, setValue } = formMethods;

  const authComponent = watch("component");

  const changeAuthComponent = (component: AuthComponent) => {
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
    formMethods.reset({
      component,
      email: "",
      password: "",
      username: "",
    });
  };

  const login = (identifier: string, password?: string) => {
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

  const register = (email: string, username?: string, password?: string) => {
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

  const submitForm = (args: LoginForm) => {
    const { email, username, password } = args;
    if (authComponent === "Login") {
      login(email, password);
    } else if (authComponent === "Register") {
      register(email, username, password);
    } else {
      forgotPass(email);
    }
  };

  return (
    <Dialog>
      <DialogTrigger disableButtonEnhancement>
        <Button size="large">ورود و ثبت نام</Button>
      </DialogTrigger>
      <DialogSurface className={customDialogStyles.surface}>
        <DialogContentWrapper>
          <SampleImg></SampleImg>
          <DialogBody className={customDialogStyles.body}>
            <DialogTitle className={customDialogStyles.title}>
              {title}
            </DialogTitle>
            <SubHeader>
              {authComponent === "ForgotPassword"
                ? "لطفا ایمیل خود را وارد نمایید."
                : "با یکی از دو روش زیر می‌توانید وارد شوید."}
            </SubHeader>
            <FormProvider {...formMethods}>
              <DialogContent className={customDialogStyles.content}>
                {authComponent === "Login" && <Login />}
                {authComponent === "Register" && <Register />}
                {authComponent === "ForgotPassword" && <ForgotPassword />}
              </DialogContent>
              <DialogActions className={customDialogStyles.actions}>
                <Button
                  style={{
                    display: authComponent === "Login" ? "block" : "none",
                  }}
                  appearance="transparent"
                  size="large"
                  className={customDialogStyles.linkButton}
                  onClick={() => changeAuthComponent("ForgotPassword")}
                >
                  بازیابی رمز ورود
                </Button>
                <ButtonBlock
                  appearance="primary"
                  size="large"
                  type="submit"
                  onClick={formMethods.handleSubmit(submitForm)}
                >
                  {submitButtonText}
                </ButtonBlock>
                <ButtonBlock
                  appearance="transparent"
                  size="large"
                  onClick={() =>
                    changeAuthComponent(
                      authComponent === "Login" ? "Register" : "Login"
                    )
                  }
                >
                  {authComponent === "Login" ? "ثبت نام" : "بازگشت"}
                </ButtonBlock>
              </DialogActions>
            </FormProvider>
          </DialogBody>
        </DialogContentWrapper>
      </DialogSurface>
    </Dialog>
  );
}

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
