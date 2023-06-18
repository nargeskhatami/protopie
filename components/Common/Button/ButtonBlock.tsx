import { Button, ButtonProps, makeStyles } from "@fluentui/react-components";

const useStyles = makeStyles({
  block: {
    width: "100%",
    height: "56px",
  },
});

export default function ButtonFullWidth(
  props: React_2.ForwardRefExoticComponent<
    ButtonProps & React_2.RefAttributes<HTMLButtonElement | HTMLAnchorElement>
  > & { children?: React.ReactNode }
) {
  const styles = useStyles();
  return (
    <Button {...props} className={`${props.className} ${styles.block}`}>
      {props.children}
    </Button>
  );
}
