"use client"

import React, { useState } from 'react';
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import { Button } from '@mui/material';

interface ThemeButtonProps {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

const ThemeButton: React.FC<ThemeButtonProps> = ({ theme, setTheme }) => {
  const [icon, setIcon] = useState(theme === 'light' ? <DarkModeOutlinedIcon className="h-6 w-6" /> : <LightModeOutlinedIcon className="h-6 w-6" />);

  const handleThemeChange = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
    setIcon(theme === 'light' ? <LightModeOutlinedIcon className="h-6 w-6" /> : <DarkModeOutlinedIcon className="h-6 w-6" />);
  };

  return (
    <Button onClick={handleThemeChange} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded">
      {icon}
    </Button>
  );
};

export default ThemeButton;
