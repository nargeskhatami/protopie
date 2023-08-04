import { Button, ButtonProps, tokens } from "@fluentui/react-components";
import styled from "styled-components";

export default function ButtonFullWidth(props: ButtonProps) {
  return (
    <StyledButton {...props} className={`${props.className}`}>
      {props.children}
    </StyledButton>
  );
}

const StyledButton = styled(Button)`
  font-weight: ${tokens.fontWeightRegular} !important;
  font-size: ${tokens.fontSizeBase300} !important;
`;
