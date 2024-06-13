"use client";

import { signIn } from "next-auth/react";
import { Button } from "@mui/material";
import styles from "./SignXXForm.module.css";


export default function GitHubSignInButton() {
  return (
    <Button
      className={styles.signButton}
      onClick={() => {
        signIn('github')
          .then((result) => {
            console.log(result);
          })
          .catch((error) => {
            console.error(error);
          });
      }}
    >
      <img
        src="/github-mark-white.svg"
        alt="GitHub"
        style={{ width: "30px", height: "auto", marginRight: "10px" }}
      />
      Продолжить через GitHub
    </Button>
  );
}
