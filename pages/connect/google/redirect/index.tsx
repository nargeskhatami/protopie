import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
export default function GoogleLoginRedirect() {
  const [text, setText] = useState("Loading...");
  const router = useRouter();

  useEffect(() => {
    if (router.query.access_token)
      axios(
        `${process.env.NEXT_PUBLIC_ADMIN_URL}/api/auth/google/callback?access_token=${router.query.access_token}`
      )
        .then((res) => {
          // Successfully logged with Strapi
          // Now saving the jwt to use it for future authenticated requests to Strapi
          localStorage.setItem("jwt", res.data.jwt);
          localStorage.setItem("username", res.data.user.username);
          setText(
            "You have been successfully logged in. You will be redirected in a few seconds..."
          );
        })
        .catch((err) => {
          console.log(err);
          setText("An error occurred, please see the developer console.");
        });
  }, [router.query]);

  return <p>{text}</p>;
}
