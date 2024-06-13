'use client'
import { Button } from '@mui/material'
import { signOut } from 'next-auth/react'
import styles from "./Header.module.css";
import React from 'react'

async function SignOutButton() {
  return (
    <Button onClick={() => signOut({
        redirect: true,
        callbackUrl: `${window.location.origin}/sign-in`
    })} variant='text' className={styles.auth_button}>
        Sign Out
    </Button>
  )
}

export default SignOutButton