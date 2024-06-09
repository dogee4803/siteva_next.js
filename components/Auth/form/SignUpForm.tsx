'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Box, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import styles from "../SignXXForm.module.css";


const FormSchema = z
  .object({
    username: z.string().min(1, 'Username is required').max(100),
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must have than 8 characters'),
    confirmPassword: z.string().min(1, 'Password confirmation is required'),
    registrationdate: z.date(),
    lastlogindate: z.date()
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Password do not match',
  });

const SignUpForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      registrationdate: new Date(),
      lastlogindate: new Date()
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    console.log(values);
    try {
      const currentTimestamp = Date.now();
      const response = await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: values.username,
          email: values.email.toLowerCase(),
          password: values.password,
          registrationdate: new Date(currentTimestamp),
          lastlogindate: new Date(currentTimestamp),
        })
      })

      if (response.ok) {
        console.log('Form submitted successfully');
        console.log(response)
        router.push('/sign-in')
      } else {
        console.error('Error submitting form');
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
              {...form.register('username')}
              error={!!form.formState.errors.username}
              helperText={form.formState.errors.username?.message}
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