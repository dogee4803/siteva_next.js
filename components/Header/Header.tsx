import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Image from "next/image";
import { LeftDrawer } from "../LeftDrawer/LeftDrawer";
import Link from "next/link";
import Button from "@mui/material/Button";
import styles from "./Header.module.css";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { IconButton } from "@mui/material";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import SignOutButton from "./SignOutButton";


export const Header = async () => {
  const session = await getServerSession(authOptions);

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
