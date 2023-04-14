import { Button, Grid, Snackbar } from '@mui/material'
import React, { useContext } from 'react'
import Context from './Context'

const ConsentBanner = () => {
  const {showBanner, handleRefuseCookies, handleAcceptCookies} = useContext(Context)

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
