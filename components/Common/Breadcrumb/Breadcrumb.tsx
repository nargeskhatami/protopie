import tokens from "@/config/tokens";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import styled from "styled-components";

type JustifyT = "center" | "between" | "around" | "evenly" | "start" | "end";
type Props = {
  justify?: JustifyT;
  items: {
    label: string;
    link?: string;
  }[];
};

export default function Breadcrumb(props: Props) {
  const { items, justify = "center" } = props;
  return (
    <nav aria-label="breadcrumb">
      <BreadcrumbList justify={justify}>
        {items.map((item, index) => (
          <>
            <BreadcrumbListItem key={`breadcrumb-${index}`}>
              {item.link && items.length !== index + 1 ? (
                <BreadcrumbLink href={item.link}>{item.label}</BreadcrumbLink>
              ) : (
                item.label
              )}
            </BreadcrumbListItem>
            {items.length !== index + 1 && (
              <ChevronLeftIcon height={12} width={12} />
            )}
          </>
        ))}
      </BreadcrumbList>
    </nav>
  );
}

const BreadcrumbList = styled.ol<{
  justify: JustifyT;
}>`
  list-style: none;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.2rem;
  justify-content: ${(props) =>
    props.justify
      ? ["between", "around", "evenly"].includes(props.justify)
        ? `space-${props.justify}`
        : ["start", "end"].includes(props.justify)
        ? `flex-${props.justify}`
        : props.justify
      : "initial"};
`;

const BreadcrumbListItem = styled.li`
  display: inline;
  font-size: 12px;
  white-space: nowrap;
  &:last-child {
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const BreadcrumbLink = styled(Link)`
  :hover {
    color: ${tokens.colorBrandBackgroundHover};
  }
`;
