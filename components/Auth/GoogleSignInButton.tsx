import { FC, ReactNode } from 'react';
import { Button } from '@mui/material';

interface GoogleSignInButtonProps {
  children: ReactNode;
}

const GoogleSignInButton: FC<GoogleSignInButtonProps> = ({ children }) => {
  const loginWithGoogle = () => console.log('login with google');

  return (
    <Button
      variant="contained"
      color="secondary"
      onClick={loginWithGoogle}
      fullWidth
      sx={{ mt: 2 }}
    >
      {children}
    </Button>
  );
};

export default GoogleSignInButton;
