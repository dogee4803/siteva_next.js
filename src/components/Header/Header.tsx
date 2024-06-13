import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Image from "next/image";
import { LeftDrawer } from "../LeftDrawer/LeftDrawer";
import Link from "next/link";
import Button from "@mui/material/Button";
import styles from "./Header.module.css";
import SignOutButton from "./SignOutButton";
import ThemeButton from "./ChangeThemeButton";
import { auth } from "../../../auth"
//import NextAuth from "next-auth"


export const Header = async () => {
  const session = await auth();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "#7653fc" }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <div className={styles.headerContainer}>
            <LeftDrawer />
            <Link className={styles.Link}href="/pages/home">
              <div className={styles.logo}>
                <Image
                  src="/squirrel.svg"
                  alt="Logo"
                  width={50}
                  height={50}
                  className={styles.logo_image}
                />
                <h1 className={styles.site_title}>Цифровой медецинский и ВА помощник</h1>
              </div>
            </Link>
          </div>
          <ThemeButton />
          {session?.user ? (
            <>
              <div> Signed in as {session.user.email} </div>
              <SignOutButton />
            </>
          ) : (
            <Link href="/sign-in">
              <Button variant="text" className={styles.auth_button}>
                Sign in
              </Button>
            </Link>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
