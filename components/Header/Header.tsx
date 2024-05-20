import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Image from "next/image";
import { LeftDrawer } from "../LeftDrawer/LeftDrawer";
import Link from "next/link";
import Button from "@mui/material/Button";
import styles from "./Header.module.css";

export const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "#7653fc" }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <div className={styles.headerContainer}>
            <LeftDrawer />
            <Link className={styles.Link}href="/">
              <div className={styles.logo}>
                <Image
                  src="/squirrel.svg"
                  alt="Logo"
                  width={50}
                  height={50}
                  className={styles.logo_image}
                />
                <h1 className={styles.site_title}>Виртуальные Ассистенты</h1>
              </div>
            </Link>
          </div>
          <Link href="/sign-in">
            <Button variant="text" className={styles.auth_button}>
              Sign in
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
