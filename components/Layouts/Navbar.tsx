import Auth from "@/components/Auth/Container";
import Container from "@/components/Common/Container";
import useIsMobile from "@/hooks/useIsMobile";
import { tokens } from "@fluentui/react-theme";
import { Bars3Icon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import styled from "styled-components";

type Props = {
  navigation: Menu[];
};

export default function Navbar(props: Props) {
  const { navigation } = props;
  const isMobile = useIsMobile();
  return (
    <Wrapper>
      <StyledContainer isMobile={isMobile}>
        {isMobile ? (
          <Bars3Icon width={24} height={24} />
        ) : (
          <NavbarList>
            <Auth />
            {navigation.map((item) => {
              return (
                <li key={item.id}>
                  <Link href={item.path}>{item.title}</Link>
                </li>
              );
            })}
            <MagnifyingGlassIcon width={20} height={20} />
          </NavbarList>
        )}
        <svg width={234} height={30}>
          <use href={`/sprite.svg#logo`} />
        </svg>
      </StyledContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: ${tokens.spacingVerticalM} 0;
`;

const NavbarList = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  gap: ${tokens.spacingHorizontalXXL};
`;

const StyledContainer = styled(Container)<{ isMobile?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ isMobile }) => (isMobile ? `0 ${tokens.spacingHorizontalXL}` : `0`)};
`;
