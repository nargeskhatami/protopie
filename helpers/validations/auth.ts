import { object, string } from "yup";

export const loginShema = object().shape({
  component: string().oneOf(["Register", "Login", "ForgotPassword"]).required(),
  email: string().required("ایمیل اجباری است"),
  username: string().when("component", {
    is: "Register",
    then: (schema) => schema.required("نام کاربری اجباری است"),
  }),
  password: string()
    .when("component", {
      is: "Login",
      then: (schema) => schema.required("رمز ورود اجباری است"),
    })
    .when("component", {
      is: "Register",
      then: (schema) => schema.required("رمز ورود اجباری است"),
    }),
});
