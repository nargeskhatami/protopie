import { Controller, useFormContext } from "react-hook-form";
import styled from "styled-components";
import InputLarge from "../Common/Input/InputLarge";

export default function ForgotPassword() {
  const {
    control,
    formState: { errors },
  } = useFormContext<LoginForm>();

  return (
    <Wrapper>
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <InputLarge
            {...field}
            label="ایمیل"
            error={errors.email?.message as string}
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
