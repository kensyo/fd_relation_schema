import { Button, Grid, Snackbar } from '@mui/material'
import React, { useState } from 'react'
import config from '../config.json'

const cookie_consent = config.cookie_consent

const ConsentBanner = () => {
  const [showBanner, setShowBanner] = useState(() => {
    const consent = document.cookie
      .split('; ')
      .find((row) => row.startsWith('cookie_consent='))

    // if cookie_consent doesn't exist
    if (consent === undefined) {
      return true
    }

    const value = consent.split('=')[1]

    // if cookie_consent does exist and its value is 'true' or 'false'
    if (value === 'true' || value === 'false') {
      return false
    }

    // if cookie_consent does exist and its value is invalid
    return true
  })

  const handleAcceptCookies = () => {
    window.setCookie(
      cookie_consent.key,
      'true',
      cookie_consent.expiration_days
    ) // Set consent cookie to expire in 30 days
    window.loadGoogleAnalytics()
    window.gtag('config', 'G-MJN1642ZBW', { anonymize_ip: true })
    setShowBanner(false)
  }

  const handleRefuseCookies = () => {
    window.setCookie(
      cookie_consent.key,
      'false',
      cookie_consent.expiration_days
    ) // Set consent cookie to expire in 30 days
    setShowBanner(false)
  }

  return (
    <>
      {showBanner && (
        <Snackbar
          open={showBanner}
          message="By clicking 'ACCEPT', you agree this website can store cookies related to google analytics on your device."
          action={
            <Grid container sx={{ px: 2 }}>
              <Grid item xs={5}>
                <Button color="info" size="small" onClick={handleRefuseCookies}>
                  Refuse
                </Button>
              </Grid>
              <Grid item xs={2}></Grid>
              <Grid item xs={5}>
                <Button color="info" size="small" onClick={handleAcceptCookies}>
                  Accept
                </Button>
              </Grid>
            </Grid>
          }
        />
      )}
    </>
  )
}

export default ConsentBanner
