"use client";

import { signIn } from "next-auth/react";
import { Button } from "@mui/material";
import styles from "./SignXXForm.module.css";
import { DEFAULT_LOGINREDIRECT } from "../../../routes";

interface Props {
  icon: string;
  icon_alt: string;
  text: string;
  provider: string;
}

export default function OAuthButton({ icon, icon_alt, text, provider }: Props) {
  return (
    <Button
      className={styles.signButton}
      onClick={() => {
        signIn(provider, {
          callbackUrl: DEFAULT_LOGINREDIRECT
        })
          .then((result) => {
            console.log(result);
          })
          .catch((error) => {
            console.error(error);
          });
      }}
    >
      <img src={icon} alt={icon_alt} style={{ width: "35px", height: "auto", marginRight: "10px" }} />
      {text}
    </Button>
  );
}
