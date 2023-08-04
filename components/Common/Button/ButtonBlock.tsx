import { Button, ButtonProps, makeStyles, tokens } from "@fluentui/react-components";

export default function ButtonFullWidth(props: ButtonProps) {
  const styles = useStyles();
  return (
    <Button {...props} className={`${props.className} ${styles.block}`}>
      {props.children}
    </Button>
  );
}

const useStyles = makeStyles({
  block: {
    fontWeight: tokens.fontWeightRegular,
    fontSize: tokens.fontSizeBase300,
    width: "100%",
    height: "56px",
    "> span": {
      marginLeft: tokens.spacingHorizontalM,
      marginRight: tokens.spacingHorizontalM,
    },
  },
});
