import { Body2, Title2, makeStyles, tokens } from "@fluentui/react-components";
import Flex from "../Grid/Flex";

type Props = {
  title: string;
  subtitle?: string;
};

export default function Heading(props: Props) {
  const { title, subtitle } = props;
  const styles = useStyles();

  return (
    <Flex align="center" column className={styles.Wrapper}>
      <Title2>{title}</Title2>
      {subtitle && <Body2 className={styles.subTitle}>{subtitle}</Body2>}
    </Flex>
  );
}

const useStyles = makeStyles({
  Wrapper: {
    marginTop: tokens.spacingVerticalXXXL,
    marginBottom: tokens.spacingVerticalXXXL,
  },
  subTitle: {
    marginTop: tokens.spacingVerticalMNudge,
    color: tokens.colorNeutralForeground4,
  },
});
