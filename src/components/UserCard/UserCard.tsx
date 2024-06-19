import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import { AvatarIcon } from '@/components/Avatar/Avatar';

interface UserCardProps {
  name: string;
  email: string;
  createdAt: string;
  image: string;
}

export const UserCard: React.FC<UserCardProps> = ({
  name,
  email,
  createdAt: createdAt,
  image,
}) => {
  return (
    <Card>
      <CardContent>
        <AvatarIcon name={name} photo={image} />
        <Typography variant="h5" component="h2">
          {name}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {email}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Created: {createdAt}
        </Typography>
      </CardContent>
        <Button variant="contained" color="primary" sx={{ margin: '16px' }}>
          Кря!
        </Button>
    </Card>
  );
};

export default UserCard;
