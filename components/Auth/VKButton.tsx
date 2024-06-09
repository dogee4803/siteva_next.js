"use client";

import { signIn } from "next-auth/react";
import { Button } from "@mui/material";
import styles from "./SignXXForm.module.css";


export default function VKSignInButton() {
  return (
    <Button
      className={styles.signButton}
      onClick={() => {
        signIn('vk', { callbackUrl: "/pages/profile" })
          .then((result) => {
            console.log(result);
          })
          .catch((error) => {
            console.error(error);
          });
      }}
    >
      <img
        src="/VK Logo.svg"
        alt="VK"
        style={{ width: "30px", height: "auto", marginRight: "10px" }}
      />
      Продолжить через VK
    </Button>
  );
}
