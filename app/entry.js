'use strict'

import React from 'react'
import ReactDOM from 'react-dom/client'

import { ThemeProvider } from '@mui/material/styles'
import { SnackbarProvider } from 'notistack'
import CssBaseline from '@mui/material/CssBaseline'
import theme from './js/theme'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import AppLayout from './js/AppLayout'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <AppLayout />
      </SnackbarProvider>
    </ThemeProvider>
  </React.StrictMode>
)
