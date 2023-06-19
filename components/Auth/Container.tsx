import { Suspense, lazy, useState } from "react";

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
} from "@fluentui/react-components";
import styled from "styled-components";

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
  rightButton: {
    alignSelf: "flex-start",
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
  height: 612px;
  background: white;
  border-radius: 16px;
`;

// A function that returns the component based on the authComponent state value
function getAuthComponent(authComponent: string) {
  switch (authComponent) {
    case "Login":
      return lazy(() => import("./Login"));
    case "Register":
      return lazy(() => import("./Register"));
    case "ForgotPassword":
      return lazy(() => import("./ForgotPassword"));
    default:
      return null;
  }
}

export default function AuthDialog() {
  const [authComponent, setAuthComponent] = useState("Login");
  const customDialogStyles = useCustomDialogStyles();

  // Get the component based on the authComponent state value
  const AuthComponent = getAuthComponent(authComponent);

  const changeAuthComponent = (
    component: "Register" | "Login" | "ForgotPassword" | "" = ""
  ) => {
    if (component) setAuthComponent(component);
    else if (authComponent === "Login") setAuthComponent("Register");
    else setAuthComponent("Login");
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
            <DialogTitle className={customDialogStyles.title}>ورود</DialogTitle>
            <SubHeader>با یکی از دو روش زیر می‌توانید وارد شوید.</SubHeader>
            <DialogContent className={customDialogStyles.content}>
              {/* Use React.Suspense to render a fallback while loading the component */}
              <Suspense fallback={<div>Loading...</div>}>
                {AuthComponent && <AuthComponent />}
              </Suspense>
            </DialogContent>
            <DialogActions className={customDialogStyles.actions}>
              {authComponent === "Login" && (
                <Button
                  appearance="transparent"
                  size="large"
                  className={customDialogStyles.rightButton}
                  onClick={() => changeAuthComponent("ForgotPassword")}
                >
                  بازیابی رمز ورود
                </Button>
              )}
              <ButtonBlock appearance="primary" size="large">
                ورود
              </ButtonBlock>
              <ButtonBlock
                appearance="transparent"
                size="large"
                onClick={changeAuthComponent}
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
