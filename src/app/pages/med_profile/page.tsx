import { Header } from "../../../../components/Header/Header";
import React from "react";
import FitnessTable from "../../../../components/FitnessTable/FitnessTable";
import { ProfileInfo } from "../../../../components/ProfileInfo/ProfileInfo";
import { getServerSession } from "next-auth";
import { authOptions, loginIsRequiredServer } from "@/lib/auth";
import { Grid, Box } from "@mui/material";

const page = async () => {
  await loginIsRequiredServer();
  const session = await getServerSession(authOptions);
  return (
    <div className="body">
      <Header />
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={8} md={6}>
          <ProfileInfo
            name={session?.user.username!}
            email={session?.user.email!}
            registrationDate={session?.user!.registrationdate!}
            height="180 см"
            age="35 лет"
          />
        </Grid>
        <Grid item xs={12} sm={8} md={6}>
          <FitnessTable />
        </Grid>
      </Grid>
    </div>
  );
}

export default page;
