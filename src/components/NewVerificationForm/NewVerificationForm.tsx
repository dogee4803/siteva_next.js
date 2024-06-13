'use client'

import { Box, Button, Grid, Typography } from '@mui/material';
import { BeatLoader } from "react-spinners";
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import styles from "@/components/Auth/SignXXForm.module.css";
import { newVerification } from './new-verification';
import Alert from '@mui/material/Alert';

export const NewVerificationForm = () => {
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();

    const searchParams = useSearchParams();

    const token = searchParams.get("token");

    const onSubmit = useCallback(() => {
        if (success || error) return;

        if (!token) {
            setError("Нет токена!");
            return;
        }
        newVerification(token)
        .then((data) => {
            setSuccess(data.success);
            setError(data.error);
        })
        .catch(() => {
            setError("Что-то пошло не так!");
        })
    }, [token, success, error]);

    useEffect(() => {
        onSubmit();
    }, [onSubmit]);

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    minWidth: 300,
                    maxWidth: 400,
                    padding: 2,
                    border: '1px solid #ccc',
                    borderRadius: 2,
                    textAlign: 'center',
                    margin: '40px 0',
                }}
            >
                <Grid container direction="column" spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h4" color="#7653fc">
                            Проверка верификации почты!
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        {!success && !error && (
                            <BeatLoader />
                        )}
                        {!success && error && (
                            <Alert severity="error" sx={{ mt: 3, my: 3, maxWidth: 'auto' }}>
                                {error}
                            </Alert>
                            )}
                        {success && (
                            <Alert severity="success" sx={{ mt: 3, my: 3, maxWidth: 'auto' }}>
                                {success}
                            </Alert>
                        )}
                    </Grid>
                    <Grid item xs={12}>
                        <Button className={styles.signButton} fullWidth href="sign-in">
                            Принять
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

