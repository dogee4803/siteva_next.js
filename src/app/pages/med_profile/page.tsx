import { Header } from "../../../../components/Header/Header";
import React from "react";
import FitnessTable from "../../../../components/FitnessTable/FitnessTable";
import { ProfileInfo } from "../../../../components/ProfileInfo/ProfileInfo";
import { Grid, Box } from "@mui/material";

export default function Home(): JSX.Element {
  return (
    <div className="body">
      <Header />
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={8} md={6}>
          <ProfileInfo
            name="Василий Пупкин"
            email="vpup@example.com"
            registrationDate="15 марта 2023"
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
