import { tokens } from "@fluentui/react-components";
import { ReactNode } from "react";
import styled from "styled-components";

type Props = {
  children?: ReactNode;
  size?: number;
};

export default function Col(props: Props) {
  return <Column {...props}>{props.children}</Column>;
}

const Column = styled.div<Props>`
  flex: ${(props) => (props.size ? props.size : 1)};
  padding: 0 ${tokens.spacingHorizontalM};
`;
