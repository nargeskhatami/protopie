import {
  Body2,
  Title2,
  makeStyles,
  tokens,
  Subtitle1,
} from "@fluentui/react-components";
import Flex from "../Grid/Flex";
import useIsMobile from "@/hooks/useIsMobile";

type Props = {
  title: string;
  subtitle?: string;
};

export default function Heading(props: Props) {
  const { title, subtitle } = props;
  const styles = useStyles();

  const isMobile = useIsMobile();

  return (
    <Flex
      align="center"
      column
      className={isMobile ? styles.WrapperMobile : styles.Wrapper}
    >
      {isMobile ? <Subtitle1>{title}</Subtitle1> : <Title2>{title}</Title2>}
      {subtitle && <Body2 className={styles.subTitle}>{subtitle}</Body2>}
    </Flex>
  );
}

const useStyles = makeStyles({
  Wrapper: {
    marginTop: tokens.spacingVerticalXXXL,
    marginBottom: tokens.spacingVerticalXXXL,
  },
  WrapperMobile: {
    marginTop: tokens.spacingVerticalXXXL,
    marginBottom: tokens.spacingVerticalM,
  },
  subTitle: {
    marginTop: tokens.spacingVerticalMNudge,
    color: tokens.colorNeutralForeground4,
    textAlign: "center",
  },
});
