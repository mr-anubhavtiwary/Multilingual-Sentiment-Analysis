// import { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import "./Start.css";
import Form from './Form';

function Start(props) {
    const theme = createTheme({
        palette: {
            primary: {
            main: '#03a9f4',
            },
            secondary: {
            main: '#b2ebf2',
            },
            tertiary: {
            main: '#b2dfdb',
            }
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <Form {...props} />
        </ThemeProvider>
    );
}

export default Start;
