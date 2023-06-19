import {
  Label,
  Input,
  makeStyles,
  shorthands,
  InputSlots,
  ComponentProps,
} from "@fluentui/react-components";

const useStyles = makeStyles({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    ...shorthands.gap("8px"),
  },
  label: {
    textAlign: "start",
  },
  input: {
    height: "56px",
  },
});

type Props = React_2.ForwardRefExoticComponent<
  Omit<
    ComponentProps<Partial<InputSlots>, "input">,
    "children" | "size" | "type" | "value" | "onChange" | "defaultValue"
  > & {
    (Missing: any): any;
  } & React_2.RefAttributes<HTMLInputElement>
> & { label?: string };

export default function InputLarge(props: Props) {
  const styles = useStyles();
  return (
    <div className={styles.wrapper}>
      <Label htmlFor={props.id} className={styles.label}>{props.label}</Label>
      <Input {...props} className={`${props.className} ${styles.input}`} />
    </div>
  );
}
