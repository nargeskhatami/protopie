import { Input, InputProps, Label, makeStyles, shorthands } from "@fluentui/react-components";
import styled from "styled-components";

type Props = InputProps & { label?: string; error: string };

export default function InputLarge(props: Props) {
  const styles = useStyles();
  const { id, label, error, ...inputProps } = props;

  const labelClassName = `${error ? styles.errorLabel : styles.label}`;
  const inputClassName = `${error ? styles.errorInput : styles.input}`;

  return (
    <div className={styles.wrapper}>
      <Label htmlFor={id} className={labelClassName}>
        {label}
      </Label>
      <Input {...inputProps} className={inputClassName} />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  );
}

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
  errorLabel: {
    textAlign: "start",
    color: "var(--colorPaletteRedBorder1)",
  },
  errorInput: {
    height: "56px",
    borderTopColor: "var(--colorPaletteRedBorder1)",
    borderBottomColor: "var(--colorPaletteRedBorder1)",
    borderLeftColor: "var(--colorPaletteRedBorder1)",
    borderRightColor: "var(--colorPaletteRedBorder1)",
  },
});

const ErrorMessage = styled.p`
  color: var(--colorPaletteRedBorder1);
  font-size: var(--fontSizeBase200);
`;
