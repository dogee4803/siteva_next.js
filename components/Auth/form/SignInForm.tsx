'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Box, Button, Grid, Link, Typography, TextField } from '@mui/material';
import GoogleSignInButton from '../GoogleSignInButton';

const FormSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must have than 8 characters'),
});

const SignInForm = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    console.log(values);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Box component="form" onSubmit={form.handleSubmit(onSubmit)} 
      sx={{
          width: '100%',
          minWidth: 300,
          maxWidth: 400,
          padding: 2,
          border: '1px solid #ccc',
          borderRadius: 2,
          textAlign: 'center',
        }}>
        <Grid container direction="column" spacing={1}>
          <Grid item>
            <TextField
              label="Email"
              placeholder="mail@example.com"
              {...form.register('email')}
              error={!!form.formState.errors.email}
              helperText={form.formState.errors.email?.message}
            />
          </Grid>
          <Grid item>
            <TextField
              type="password"
              label="Password"
              placeholder="Enter your password"
              {...form.register('password')}
              error={!!form.formState.errors.password}
              helperText={form.formState.errors.password?.message}
            />
          </Grid>
        </Grid>
        <Button variant="contained" type="submit" fullWidth sx={{ mt: 3 }}>
          Sign in
        </Button>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', my: 3 }}>
          <Box sx={{ flexGrow: 1, bgcolor: 'divider', height: 1 }} />
          <Typography sx={{ px: 2, color: 'text.secondary' }}>or</Typography>
          <Box sx={{ flexGrow: 1, bgcolor: 'divider', height: 1 }} />
        </Box>
        <GoogleSignInButton>Sign in with Google</GoogleSignInButton>
        <Typography variant="body2" align="center" color="text.secondary" sx={{ mt: 2 }}>
          If you don&apos;t have an account, please&nbsp;
          <Link href="/sign-up" color="primary" underline="hover">
            Sign up
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default SignInForm;
