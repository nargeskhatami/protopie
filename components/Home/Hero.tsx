import Button from "@/components/Common/Button/Button";
import ButtonBlock from "@/components/Common/Button/ButtonBlock";
import useIsMobile from "@/hooks/useIsMobile";
import { Body2, Display, Divider, Title1, makeStyles, tokens } from "@fluentui/react-components";
import Image from "next/image";
import styled from "styled-components";
import heroPic from "../../public/images/learn-protopite.png";
import Flex from "../Common/Grid/Flex";

type Props = {
  data: Hero;
};

export default function Hero(props: Props) {
  const { data } = props;
  const { mainTitle, subTitle, description, mainLink, secondLink } = data;

  const styles = useStyles();
  const isMobile = useIsMobile();

  return (
    <HeroWrapper column align="center" justify="center" gap={tokens.spacingVerticalXXXL}>
      <Flex column align="center" justify="center" gap={tokens.spacingHorizontalXXXL}>
        <Flex
          direction="ltr"
          gap={tokens.spacingHorizontalS}
          column={isMobile}
          align="center"
          justify="center"
        >
          {isMobile ? (
            <>
              <Title1 className={styles.heroFirstTitlePart}>{mainTitle.firstPart}</Title1>
              <Title1>{mainTitle.secondPart}</Title1>
              <Title1>{mainTitle.thirdPart}</Title1>
            </>
          ) : (
            <>
              <Display className={styles.heroFirstTitlePart}>{mainTitle.firstPart}</Display>
              <Display>{mainTitle.secondPart}</Display>
              <Display>{mainTitle.thirdPart}</Display>
            </>
          )}
        </Flex>
        <Flex gap={tokens.spacingHorizontalS} column={isMobile} align="center" justify="center">
          <Body2 className={styles.heroSubtitle}>{subTitle.firstPart}</Body2>
          {!isMobile && <Divider vertical style={{ flex: "unset" }} />}
          <Body2 className={styles.heroSubtitle}>{subTitle.secondPart}</Body2>
        </Flex>
        <Body2>{description}</Body2>
        <Flex gap={tokens.spacingHorizontalL} justify="center" column={isMobile}>
          {isMobile ? (
            <>
              <ButtonBlock
                appearance="primary"
                size="large"
                onClick={() => window.open(mainLink.url, "_blank")?.focus()}
              >
                {mainLink.text}
              </ButtonBlock>
              <ButtonBlock
                appearance="secondary"
                size="large"
                onClick={() => window.open(secondLink.url, "_blank")?.focus()}
              >
                {secondLink.text}
              </ButtonBlock>
            </>
          ) : (
            <>
              <Button
                appearance="primary"
                size="large"
                onClick={() => window.open(mainLink.url, "_blank")?.focus()}
              >
                {mainLink.text}
              </Button>
              <Button
                appearance="secondary"
                size="large"
                onClick={() => window.open(secondLink.url, "_blank")?.focus()}
              >
                {secondLink.text}
              </Button>
            </>
          )}
        </Flex>
      </Flex>
      {!isMobile && <Image src={heroPic} alt="Learn Protopie" />}
    </HeroWrapper>
  );
}

const useStyles = makeStyles({
  heroFirstTitlePart: {
    color: tokens.colorBrandBackground,
  },
  heroSubtitle: {
    color: tokens.colorNeutralForeground4,
  },
});

const HeroWrapper = styled(Flex)`
  position: relative;
  margin: ${tokens.spacingVerticalXXXL} 0;
  padding: 0 ${tokens.spacingHorizontalXL};
  img {
    width: auto !important;
    height: 85vh !important;
  }
`;
