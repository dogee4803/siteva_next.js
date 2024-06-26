'use client'

import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Grid, Link, Typography, TextField } from '@mui/material';
import { useRouter } from 'next/navigation';
import styles from "../SignXXForm.module.css";
import Alert from '@mui/material/Alert';
import { startTransition, useState } from 'react';
import { SignInSchema } from '@/lib/schemas/signIn-schema';
import { DEFAULT_LOGINREDIRECT } from '../../../../routes';
import login from '@/components/Auth/login';
import OAuthButton from '@/components/Auth/OAuthButton';

const SignInForm = () => {
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [myError, setMyError] = useState('');
  const [mySuccess, setMySuccess] = useState('');
  const router = useRouter();
  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: '',
      password: '',
      code: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof SignInSchema>) => {
    startTransition(() => {
      login(values)
        .then((data) => {
          if (data?.error) {
            setMyError("Пароль или почта указаны не верно!");
          }
          if (data?.success) {
            setMySuccess("Подтверждение почты отправлено!");
          }
          if (data?.twoFactor) {
            setShowTwoFactor(true);
          }
        })
        .catch(() => setMyError("Что-то пошло не так!"));
    });
    router.push(DEFAULT_LOGINREDIRECT);
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
      <Box component="form" onSubmit={form.handleSubmit(onSubmit)} sx={{
          width: '100%',
          minWidth: 300,
          maxWidth: 400,
          padding: 2,
          border: '1px solid #ccc',
          borderRadius: 2,
          textAlign: 'center',
        }}>
        {showTwoFactor && (
          <Grid container direction="column" spacing={1}>
          <Grid item>
            <TextField
              label="2FA Код"
              placeholder="123456"
              {...form.register('code')}
              error={!!form.formState.errors.email}
              helperText={form.formState.errors.email?.message}
            />
          </Grid>
        </Grid>
        )}
        {!showTwoFactor && (
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
        )}
        {myError && (
          <Alert severity="error" sx={{ mt: 3, my: 3 }}>
            {myError}
          </Alert>
        )}
        {mySuccess && (
          <Alert severity="success" sx={{ mt: 3, my: 3 }}>
            {mySuccess}
          </Alert>
        )}
        <Button className={styles.signButton} type="submit" fullWidth sx={{ mt: 3 }}>
          {showTwoFactor ? "Ввести код" : "Войти"}
        </Button>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', my: 3 }}>
          <Box sx={{ flexGrow: 1, bgcolor: 'divider', height: 2 }} />
          <Typography sx={{ px: 2, color: 'text.secondary' }}>или</Typography>
          <Box sx={{ flexGrow: 1, bgcolor: 'divider', height: 2 }} />
        </Box>
        <OAuthButton icon='/github-mark-white.svg' icon_alt='GitHub Icon' text='Продолжить через GitHub' provider='github'/>
        <OAuthButton icon='/VK Logo.svg' icon_alt='VK Icon' text='Продолжить через VK' provider='vk'/>
        <OAuthButton icon='/Yandex_icon.svg' icon_alt='yandex Icon' text='Продолжить через Яндекс' provider='yandex'/>
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
