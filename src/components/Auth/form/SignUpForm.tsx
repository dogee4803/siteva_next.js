'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Box, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import styles from "../SignXXForm.module.css";
import { SignUpSchema } from '@/lib/schemas/signUp-schema';
import Alert from '@mui/material/Alert';
import { useState } from 'react';

const SignUpForm = () => {
  const [error, setError] = useState('');
  const router = useRouter();
  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof SignUpSchema>) => {
    console.log(values);
    try {
      const currentTimestamp = Date.now();
      const response = await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email.toLowerCase(),
          password: values.password,
        })
      })

      if (response.ok) {
        console.log('Form submitted successfully');
        console.log(response) 
        router.push('/sign-in')
      } else {
        console.error('Error submitting form');
        const status = response.status;
        if (status === 408) {
          setError("Данная почта уже зарегестрирована!");
        }
        else if (status === 409) {
          setError("Данное имя уже занято!");
        } 
        else {
          setError("Неизвестная ошибка!");
        }
        console.log(response)
      }
    } catch (error) {
      console.error('Error submitting form:', error);
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
      sx={{ width: '100%',
          minWidth: 300,
          maxWidth: 400,
          padding: 2,
          border: '1px solid #ccc',
          borderRadius: 2,
          textAlign: 'center',
      }}>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <TextField
              label="Имя пользователя"
              placeholder="Иван"
              {...form.register('name')}
              error={!!form.formState.errors.name}
              helperText={form.formState.errors.name?.message}
            />
          </Grid>
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
          <Grid item>
            <TextField
              type="password"
              label="Подтвердите ваш пароль"
              placeholder="Подтвердите ваш пароль"
              {...form.register('confirmPassword')}
              error={!!form.formState.errors.confirmPassword}
              helperText={form.formState.errors.confirmPassword?.message}
            />
          </Grid>
        </Grid>
        <Button className={styles.signButton} type="submit" fullWidth sx={{ mt: 3 }}>
          Зарегистрироваться
        </Button>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', my: 3 }}>
          <Box sx={{ flexGrow: 1, bgcolor: 'divider', height: 2 }} />
          <Typography sx={{ px: 2, color: 'text.secondary' }}>или</Typography>
          <Box sx={{ flexGrow: 1, bgcolor: 'divider', height: 2 }} />
        </Box>
        {error && (
          <Alert severity="error" sx={{ mt: 3, my: 3 }}>
            {error}
          </Alert>
        )}
        <Typography variant="body2" align="center" color="text.secondary" sx={{ mt: 2 }}>
          Если у вас есть аккаунт, пожалуйста,&nbsp;
          <Link href="/sign-in" color="primary" underline="hover">
            войдите
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default SignUpForm;