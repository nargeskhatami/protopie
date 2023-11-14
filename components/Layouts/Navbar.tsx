import Auth from "@/components/Auth/Container";
import Container from "@/components/Common/Container";
import useIsMobile from "@/hooks/useIsMobile";
import {
  Body1,
  Body2,
  Button,
  Divider,
  Input,
} from "@fluentui/react-components";
import { tokens } from "@fluentui/react-theme";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useState } from "react";
import styled from "styled-components";
import Flex from "../Common/Grid/Flex";

type Props = {
  navigation: Menu[];
};

export default function Navbar(props: Props) {
  const { navigation } = props;
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Wrapper>
      <StyledContainer isMobile={isMobile}>
        {isMobile ? (
          <>
            <Button
              style={{ minWidth: "fit-content" }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              appearance="transparent"
              size="small"
            >
              {isMenuOpen ? (
                <XMarkIcon width={24} height={24} />
              ) : (
                <Bars3Icon width={24} height={24} />
              )}
            </Button>

            <MobileMenuWrapper isMenuOpen={isMenuOpen}>
              <MobileNavbarList>
                <Button
                  style={{
                    minWidth: "fit-content",
                    marginRight: 0,
                    marginLeft: "auto",
                  }}
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  appearance="transparent"
                  size="small"
                >
                  <XMarkIcon width={24} height={24} />
                </Button>
                <MobileMenu column gap={tokens.spacingVerticalXL}>
                  <Input
                    style={{
                      width: "100%",
                    }}
                    placeholder="جستجو"
                    size="large"
                    id="search"
                    contentAfter={
                      <MagnifyingGlassIcon width={20} height={20} />
                    }
                  />
                  {navigation.map((item) => {
                    return (
                      <li
                        key={item.id}
                        style={{
                          width: "100%",
                        }}
                      >
                        <Link
                          href={item.path}
                          style={{
                            display: "block",
                            marginBottom: tokens.spacingVerticalM,
                          }}
                        >
                          <Body1>{item.title}</Body1>
                        </Link>
                        <Divider />
                      </li>
                    );
                  })}
                </MobileMenu>
                <Auth />
              </MobileNavbarList>
            </MobileMenuWrapper>
          </>
        ) : (
          <NavbarList>
            <li>
              <Auth />
            </li>
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
        <Flex align="center" gap={12} style={{ minWidth: "unset" }}>
          <Body2 style={{ color: tokens.colorBrandBackground }}>Beta</Body2>
          <Link href="/" aria-label="Protopie Logo">
            <svg width={234} height={30}>
              <use href={`/sprite.svg#logo`} />
            </svg>
          </Link>
        </Flex>
      </StyledContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: ${tokens.spacingVerticalM} 0;
`;

const MobileMenuWrapper = styled.div<{ isMenuOpen: boolean }>`
  position: fixed;
  height: 100%;
  width: 100%;
  left: 0;
  bottom: 0;
  z-index: 1000;
  transition: all 0.2s;
  visibility: ${({ isMenuOpen }) => (isMenuOpen ? "visible" : "hidden")};
  opacity: ${({ isMenuOpen }) => (isMenuOpen ? "1" : "0")};
  z-index: 1000;
  background: ${tokens.colorNeutralBackground3};
`;

const MobileMenu = styled(Flex)``;

const NavbarList = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  gap: ${tokens.spacingHorizontalXXL};
`;

const MobileNavbarList = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  flex-direction: column;
  height: 100% 
  justify-content: space-between;
  gap: ${tokens.spacingHorizontalXXL};
  padding: ${tokens.spacingHorizontalXXL};
`;

const StyledContainer = styled(Container)<{ isMobile?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ isMobile }) =>
    isMobile ? `0 ${tokens.spacingHorizontalXL}` : `0`};
`;
