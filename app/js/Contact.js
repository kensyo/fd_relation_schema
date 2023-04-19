import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Link,
  Typography,
} from '@mui/material'
import React from 'react'

const Contact = () => {
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <Typography
        onClick={handleClickOpen}
        sx={{ cursor: 'pointer', color: 'info.main' }}
      >
        Contact
      </Typography>
      <Dialog
        maxWidth="md"
        open={open}
        onClose={handleClose}
        scroll={'paper'}
        aria-labelledby="contact-dialog-title"
        aria-describedby="contact-dialog-description"
      >
        <DialogTitle id="contact-dialog-title">Contact</DialogTitle>
        <DialogContent>
          <DialogContentText id="contact-dialog-description">
            If you have any questions, you can contact us via github issue.
            <br />
            <Link
              href="https://github.com/kensyo/fd-relation-schema/issues"
              target="_blank"
              rel="noopener noreferrer"
              underline="hover"
            >
              https://github.com/kensyo/fd-relation-schema/issues
            </Link>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

// github の issue へのリンクと、メールアドレス

export default Contact
