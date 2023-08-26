import tokens from "@/config/tokens";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import styled from "styled-components";

type Props = {
  items: {
    label: string;
    link?: string;
  }[];
};
export default function Breadcrumb(props: Props) {
  const { items } = props;
  return (
    <nav aria-label="breadcrumb">
      <BreadcrumbList>
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

const BreadcrumbList = styled.ol`
  list-style: none;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.2rem;
`;

const BreadcrumbListItem = styled.li`
  display: inline;
  font-size: 12px;
`;

const BreadcrumbLink = styled(Link)`
  :hover {
    color: ${tokens.colorBrandBackgroundHover};
  }
`;
