import * as React from "react";

import Login from "./Login";

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
import ButtonBlock from "../Common/Button/ButtonBlock";

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

export default function AuthDialog() {
  const customDialogStyles = useCustomDialogStyles();
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
              <Login />
            </DialogContent>
            <DialogActions className={customDialogStyles.actions}>
              <ButtonBlock appearance="primary" size="large">
                ورود
              </ButtonBlock>
              <ButtonBlock appearance="transparent" size="large">
                ثبت نام
              </ButtonBlock>
            </DialogActions>
          </DialogBody>
        </DialogContentWrapper>
      </DialogSurface>
    </Dialog>
  );
}
