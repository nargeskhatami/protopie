import { ReactNode } from "react";
import styled from "styled-components";

type Props = {
  children: ReactNode;
  column?: boolean;
  direction?: "ltr" | "rtl";
  align?: "center" | "start" | "end" | "baseline";
  justify?: "center" | "between" | "around" | "evenly" | "start" | "end";
  gap?: number | string;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

export default function Flex(props: Props) {
  return <FlexDiv {...props}>{props.children}</FlexDiv>;
}

const FlexDiv = styled.div<Props>`
  min-width: 100%;
  display: flex;
  align-items: ${(props) =>
    props.align
      ? ["start", "end"].includes(props.align)
        ? `flex-${props.align}`
        : props.align
      : "initial"};
  justify-content: ${(props) =>
    props.justify
      ? ["between", "around", "evenly"].includes(props.justify)
        ? `space-${props.justify}`
        : props.justify
      : "initial"};
  flex-direction: ${(props) => (props.column ? "column" : "row")};
  direction: ${(props) => props.direction};
  gap: ${(props) =>
    props.gap
      ? typeof props.gap === "string"
        ? props.gap
        : `${props.gap}px`
      : "0"};
`;
