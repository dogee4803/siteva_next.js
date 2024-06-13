import React from "react";
import { Box, Typography } from "@mui/material";
import { AvatarIcon } from "../Avatar/Avatar";

interface ProfileInfoProps {
  name: string;
  email: string;
  createdAt: string;
  height: string;
  age: string;
  image: string;
}

export const ProfileInfo: React.FC<ProfileInfoProps> = ({
  name,
  email,
  createdAt: createdAt,
  height,
  age,
  image,
}) => {
  const formattedRegistrationDate = new Date(createdAt).toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  return (
    <Box sx={{ padding: 2, border: "1px solid #ccc", borderRadius: 4 }}>
      
      <Typography variant="h5" gutterBottom>Профиль пользователя</Typography>
      <Box sx={{ marginBottom: 1 }}>
        <AvatarIcon name={name} photo = {image} />
      </Box>
      <Box sx={{ marginBottom: 1 }}>
        <Typography variant="subtitle1"><strong>Имя:</strong> {name}</Typography>
      </Box>
      <Box sx={{ marginBottom: 1 }}>
        <Typography variant="subtitle1"><strong>Email:</strong> {email}</Typography>
      </Box>
      <Box sx={{ marginBottom: 1 }}>
        <Typography variant="subtitle1"><strong>Дата регистрации:</strong> {formattedRegistrationDate}</Typography>
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
