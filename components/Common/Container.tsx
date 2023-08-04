import styled from "styled-components";

type Props = { children: React.ReactNode; className?: string };

export default function Container(props: Props) {
  const { children, className } = props;
  return <ContainerDiv className={className}>{children}</ContainerDiv>;
}

const ContainerDiv = styled.div`
  margin: 0 auto;
  @media (max-width: 576px) {
    max-width: 100%;
  }
  @media (min-width: 576px) {
    max-width: 540px;
  }
  @media (min-width: 768px) {
    max-width: 720px;
  }
  @media (min-width: 992px) {
    max-width: 960px;
  }
  @media (min-width: 1200px) {
    max-width: 1140px;
  }
  @media (min-width: 1400px) {
    max-width: 1320px;
  }
`;
