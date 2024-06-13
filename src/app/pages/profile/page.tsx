'use client'

import { Header } from "@/components/Header/Header";
import { ProfileInfo } from "@/components/ProfileInfo/ProfileInfo";
import { auth } from "../../../../auth";
import Switch from '@mui/material/Switch';
import { useState } from "react";

const ProfilePage = async () => {
  const session = await auth();
  console.log(session);

  return (
    <div className="body">
      <Header />
      <ProfileInfo
        name={session?.user!.name}
        email={session?.user!.email}
        createdAt={session?.user!.createdAt}
        height="154 см"
        age="32 лет"
        image={session?.user?.image}
      />
    </div>
  );
};

export default ProfilePage;
