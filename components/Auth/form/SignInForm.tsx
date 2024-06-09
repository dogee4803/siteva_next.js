'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Box, Button, Grid, Link, Typography, TextField } from '@mui/material';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import styles from "../SignXXForm.module.css";
import GitHubSignInButton from '../GitHubButton';
import VKSignInButton from '../VKButton'
import Alert from '@mui/material/Alert';
import { useState } from 'react';

const FormSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must have than 8 characters'),
});

const SignInForm = () => {
  const [error, setError] = useState('');
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const signInData = await signIn('credentials',  {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    if (signInData?.error) {
      console.log(signInData.error);
      setError("Пароль или почта указаны не верно!");
    }
    else {
      router.push('/pages/profile')
    }
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
              label="Эл. почта"
              placeholder="pochta@example.com"
              {...form.register('email')}
              error={!!form.formState.errors.email}
              helperText={form.formState.errors.email?.message}
            />
          </Grid>
          <Grid item>
            <TextField
              type="password"
              label="Пароль"
              placeholder="Введите ваш пароль"
              {...form.register('password')}
              error={!!form.formState.errors.password}
              helperText={form.formState.errors.password?.message}
            />
          </Grid>
        </Grid>
          {error && (
            <Alert severity="error" sx={{ mt: 3, my: 3 }}>
              {error}
            </Alert>
          )}
        <Button className={styles.signButton} type="submit" fullWidth sx={{ mt: 3 }}>
          Войти
        </Button>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', my: 3 }}>
          <Box sx={{ flexGrow: 1, bgcolor: 'divider', height: 2 }} />
          <Typography sx={{ px: 2, color: 'text.secondary' }}>или</Typography>
          <Box sx={{ flexGrow: 1, bgcolor: 'divider', height: 2 }} />
        </Box>
        <GitHubSignInButton/>
        <VKSignInButton />
        <Typography variant="body2" align="center" color="text.secondary" sx={{ mt: 2 }}>
          Если у вас нет аккаунта, пожалуйста,&nbsp;
          <Link href="/sign-up" color="primary" underline="hover">
            зарегистрируйтесь
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default SignInForm;
