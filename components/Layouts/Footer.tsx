import useIsMobile from "@/hooks/useIsMobile";
import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  Body1,
  Caption1,
  Link,
  makeStyles,
  shorthands,
  tokens,
} from "@fluentui/react-components";
import styled from "styled-components";
import Container from "../Common/Container";
import Col from "../Common/Grid/Col";
import Flex from "../Common/Grid/Flex";
import VerticalMenu from "../Common/Pack/VerticalMenu";

type Props = {
  footerInfo: FooterInfo;
};

export default function Footer(props: Props) {
  const { footerInfo } = props;

  const styles = useStyles();
  const isMobile = useIsMobile();

  return (
    <Container>
      <Flex column={isMobile}>
        {isMobile && (
          <MobileWrapper>
            <Flex column align="center" style={{ paddingBottom: tokens.spacingVerticalXXXL }}>
              <svg width={242} height={50}>
                <use href={`/sprite.svg#logo-grayscale`} />
              </svg>
              <Caption1 className={styles.logoCaption}>
                مرجع فارسی آموزش نرم افزار پروتوپای به فارسی
              </Caption1>
            </Flex>
            <Accordion collapsible multiple className={styles.accordion}>
              {footerInfo.links.map((menu, index) => (
                <AccordionItem key={`menu-${index}`} value={index}>
                  <AccordionHeader className={styles.accordionHeader}>{menu.title}</AccordionHeader>
                  <AccordionPanel style={{ paddingTop: tokens.spacingVerticalXL }}>
                    <VerticalMenu menuIndex={index} menuItems={menu.subMenus} />
                  </AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>
            <Flex
              column
              gap={tokens.spacingVerticalS}
              style={{ padding: `${tokens.spacingVerticalXXXL} 0` }}
              align="center"
            >
              <Body1 className={styles.logoCaption}>شبکه‌های اجتماعی پروتوپای</Body1>
              <Flex gap={tokens.spacingHorizontalM} justify="center">
                {footerInfo.SocialMedias.map((social, index) => (
                  <Link
                    href={social.link}
                    target="_blank"
                    className={styles.link}
                    key={`social-${index}`}
                  >
                    <svg width={24} height={24}>
                      <use href={`/sprite.svg#${social.title.toLowerCase()}`} />
                    </svg>
                  </Link>
                ))}
              </Flex>
            </Flex>
          </MobileWrapper>
        )}
        {!isMobile && (
          <>
            <Col size={4}>
              <Flex column gap={tokens.spacingVerticalXXXL}>
                <Flex column>
                  <svg width={242} height={50}>
                    <use href={`/sprite.svg#logo-grayscale`} />
                  </svg>
                  <Caption1 className={styles.logoCaption}>
                    مرجع فارسی آموزش نرم افزار پروتوپای به فارسی
                  </Caption1>
                </Flex>
                <Flex column gap={tokens.spacingVerticalS}>
                  <Body1 className={styles.logoCaption}>شبکه‌های اجتماعی پروتوپای به فارسی</Body1>
                  <Flex gap={tokens.spacingHorizontalM}>
                    {footerInfo.SocialMedias.map((social, index) => (
                      <Link
                        href={social.link}
                        target="_blank"
                        className={styles.link}
                        key={`social-${index}`}
                      >
                        <svg width={24} height={24}>
                          <use href={`/sprite.svg#${social.title.toLowerCase()}`} />
                        </svg>
                      </Link>
                    ))}
                  </Flex>
                </Flex>
              </Flex>
            </Col>
            <Col size={8}>
              <Flex>
                {footerInfo.links.map((menu, index) => (
                  <Col key={`menu-${index}`}>
                    <VerticalMenu menuIndex={index} title={menu.title} menuItems={menu.subMenus} />{" "}
                  </Col>
                ))}
              </Flex>
            </Col>
          </>
        )}
      </Flex>
      <CopyWrite>
        <Caption1 className={styles.copyWrite}>
          کلیه حقوق این وب‌سایت محفوظ و متعلق به پروتوپای فارسی می‌باشد.
        </Caption1>
      </CopyWrite>
    </Container>
  );
}

const useStyles = makeStyles({
  copyWrite: {
    color: tokens.colorNeutralForeground4,
  },
  logoCaption: {
    color: tokens.colorNeutralForeground4,
  },
  link: {
    backgroundColor: tokens.colorNeutralBackground3Selected,
    ...shorthands.borderRadius(tokens.spacingVerticalSNudge),
    height: "36px",
    width: "36px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  accordion: {
    display: "flex",
    flexDirection: "column",
    rowGap: tokens.spacingVerticalMNudge,
  },
  accordionHeader: {
    "> button": {
      display: "flex",
      justifyContent: "space-between",
      flexDirection: "row-reverse",
      backgroundColor: tokens.colorNeutralForegroundInvertedSelected,
      color: tokens.colorNeutralForeground3,
      ...shorthands.borderRadius(tokens.spacingVerticalS),
    },
    "> button[aria-expanded='false'] > span": {
      transform: "rotate(-270deg)",
      ...shorthands.padding(0),
    },
    "> button[aria-expanded='true'] > span": {
      transform: "rotate(-180deg)",
      ...shorthands.padding(0),
    },
  },
});

const MobileWrapper = styled.div`
  padding: 0 ${tokens.spacingHorizontalXL};
`;
const CopyWrite = styled.div`
  border-top: 1px solid;
  border-image-source: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.15) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  padding: ${tokens.spacingVerticalL} 0;
  text-align: center;
  position: relative;
  :before {
    content: "";
    background-image: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.15) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    height: 1px;
    width: 100%;
    display: block;
    position: absolute;
    top: 0;
    left: 0;
  }
`;
