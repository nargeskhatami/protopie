import InputLarge from "@/components/Common/Input/InputLarge";
import { Controller, useFormContext } from "react-hook-form";
import styled from "styled-components";

type Props = {
  email: string;
  onChangeEmail: Function;
};

export default function ForgotPassword(props: Props) {
  const { email, onChangeEmail } = props;

  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Wrapper>
      <Controller
        name="email"
        rules={{ required: "ایمیل اجباری است" }}
        control={control}
        render={({ field }) => (
          <InputLarge
            {...field}
            label="ایمیل"
            onChange={onChangeEmail}
            value={email}
            error={errors.email?.message}
            id="input-email"
          />
        )}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: var(--spacingVerticalXXL) 0;
  padding: var(--spacingVerticalXXL) 0;
`;
