import React from "react";
import { Box, Typography } from "@mui/material";
import { AvatarIcon } from "../Avatar/Avatar";

interface ProfileInfoProps {
  name: string;
  email: string;
  registrationDate: string;
  height: string;
  age: string;
}

export const ProfileInfo: React.FC<ProfileInfoProps> = ({
  name,
  email,
  registrationDate,
  height,
  age,
}) => {
  return (
    <Box sx={{ padding: 2, border: "1px solid #ccc", borderRadius: 4 }}>
      <AvatarIcon username={name}/>
      <Typography variant="h5" gutterBottom>Профиль пользователя</Typography>
      <Box sx={{ marginBottom: 1 }}>
        <Typography variant="subtitle1"><strong>Имя:</strong> {name}</Typography>
      </Box>
      <Box sx={{ marginBottom: 1 }}>
        <Typography variant="subtitle1"><strong>Email:</strong> {email}</Typography>
      </Box>
      <Box sx={{ marginBottom: 1 }}>
        <Typography variant="subtitle1"><strong>Дата регистрации:</strong> {registrationDate}</Typography>
      </Box>
      <Box sx={{ marginBottom: 1 }}>
        <Typography variant="subtitle1"><strong>Рост:</strong> {height}</Typography>
      </Box>
      <Box>
        <Typography variant="subtitle1"><strong>Возраст:</strong> {age}</Typography>
      </Box>
    </Box>
  );
}