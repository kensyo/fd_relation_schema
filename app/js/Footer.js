import * as React from 'react'
import { Stack } from '@mui/material'
import PrivacyPolicy from './PrivacyPolicy'
import Contact from './Contact'
import CookieSettings from './CookieSettings'

export default function () {
  return (
    <footer>
      <Stack spacing={1} alignItems="center" justifyContent="center">
        <Contact />
        <PrivacyPolicy />
        <CookieSettings />
      </Stack>
    </footer>
  )
}
