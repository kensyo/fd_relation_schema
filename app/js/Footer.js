import * as React from 'react'
import {
  Box,
  Chip,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Stack,
  Switch,
  Typography,
} from '@mui/material'
import GitHubIcon from '@mui/icons-material/GitHub'
import CloseIcon from '@mui/icons-material/Close'
import Context from './Context'
import PrivacyPolicy from './PrivacyPolicy'
import Contact from './Contact'

export default function () {
  const [cookieDialogOpen, setCookieDialogOpen] = React.useState(false)
  const { cookieConsent, handleAcceptCookies, handleRefuseCookies } =
    React.useContext(Context)

  return (
    <footer>
      <Stack spacing={1} alignItems="center" justifyContent="center">
        <Contact />
        <PrivacyPolicy />
        <Typography
          onClick={() => {
            setCookieDialogOpen(true)
          }}
          sx={{ cursor: 'pointer', color: 'info.main' }}
        >
          Cookie Settings
        </Typography>
        <Dialog
          open={cookieDialogOpen}
          onClose={() => {
            setCookieDialogOpen(false)
          }}
          aria-labelledby="cookie-dialog-title"
          aria-describedby="cookie-dialog-description"
        >
          <DialogTitle id="cookie-dialog-title">
            Cookie Settings
            <IconButton
              aria-label="close"
              onClick={() => {
                setCookieDialogOpen(false)
              }}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="cookie-dialog-description">
              This website uses cookies for Google Analytics. Do you allow the
              cookies?
            </DialogContentText>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              minHeight="100%"
              width="100%"
            >
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography>disallow</Typography>
                <Switch
                  color="primary"
                  checked={cookieConsent}
                  onClick={(event) => {
                    const value = event.target.checked
                    if (value) {
                      handleAcceptCookies()
                    } else {
                      handleRefuseCookies()
                    }
                  }}
                />
                <Typography>allow</Typography>
              </Stack>
            </Box>
          </DialogContent>
        </Dialog>
        <Typography>
          <Chip
            icon={<GitHubIcon />}
            label="Core"
            clickable
            component="a"
            href="https://github.com/kensyo/3NF_SYNTHESIS"
          />
        </Typography>
      </Stack>
    </footer>
  )
}
