import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { List, ListItem, ListItemText, Typography } from '@mui/material'

export default function () {
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const descriptionElementRef = React.useRef(null)
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef
      if (descriptionElement !== null) {
        descriptionElement.focus()
      }
    }
  }, [open])

  return (
    <div>
      <Typography
        onClick={handleClickOpen}
        sx={{ cursor: 'pointer', color: 'info.main' }}
      >
        Privacy Policy
      </Typography>
      <Dialog
        maxWidth="md"
        open={open}
        onClose={handleClose}
        scroll={'paper'}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Privacy Policy</DialogTitle>
        <DialogContent dividers>
          <List
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <ListItem>
              <ListItemText>
                This Privacy Policy explains how your data is managed, used, and
                disclosed when using this web application (hereinafter, "the
                App"). By using the App, you are considered to have agreed to
                this Privacy Policy.
              </ListItemText>
            </ListItem>

            <ListItem>
              <ListItemText primaryTypographyProps={{ variant: 'h6' }}>
                1. Data Managed & Used
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                The App manages and uses the following data:
              </ListItemText>
            </ListItem>
            <ListItem>
              <List disablePadding>
                <ListItem sx={{ py: 0 }}>
                  <ListItemText>
                    1.1. Database schema information stored in IndexedDB
                  </ListItemText>
                </ListItem>
                <ListItem sx={{ py: 0 }}>
                  <ListItemText>
                    1.2. A flag stored in LocalStorage to determine whether the
                    schema should be automatically saved to IndexedDB (an
                    auto-save flag)
                  </ListItemText>
                </ListItem>
                <ListItem sx={{ py: 0 }}>
                  <ListItemText>
                    1.3. A cookie to determine whether the user has consented to
                    the use of Google Analytics
                  </ListItemText>
                </ListItem>
                <ListItem sx={{ py: 0 }}>
                  <ListItemText>
                    1.4. Cookies used by Google Analytics
                  </ListItemText>
                </ListItem>
              </List>
            </ListItem>

            <ListItem>
              <ListItemText primaryTypographyProps={{ variant: 'h6' }}>
                2. Purpose of Managed & Used Data
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                The data managed and used by the App serves the following
                purposes:
              </ListItemText>
            </ListItem>
            <ListItem>
              <List disablePadding>
                <ListItem sx={{ py: 0 }}>
                  <ListItemText>
                    2.1. To store the user's database schema information and
                    provide normalization functionality
                  </ListItemText>
                </ListItem>
                <ListItem sx={{ py: 0 }}>
                  <ListItemText>
                    2.2. To offer an auto-save feature for user convenience
                  </ListItemText>
                </ListItem>
                <ListItem sx={{ py: 0 }}>
                  <ListItemText>
                    2.3. To determine whether the user has consented to the use
                    of Google Analytics, and to use it only if consent has been
                    given
                  </ListItemText>
                </ListItem>
                <ListItem sx={{ py: 0 }}>
                  <ListItemText>
                    2.4. To analyze the App's usage and traffic to improve
                    services and develop new features
                  </ListItemText>
                </ListItem>
                <ListItem sx={{ py: 0 }}>
                  <ListItemText>
                    2.5. To track events occurring during the use of schema
                    information display functionality and schema normalization
                  </ListItemText>
                </ListItem>
              </List>
            </ListItem>
            <ListItem>
              <ListItemText>
                Please note that the relation schema information is not sent to
                Google Analytics.
              </ListItemText>
            </ListItem>

            <ListItem>
              <ListItemText primaryTypographyProps={{ variant: 'h6' }}>
                3. Sharing and Disclosure of Data
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                The App does not disclose managed and used data to third
                parties, except in the following cases:
              </ListItemText>
            </ListItem>
            <ListItem>
              <List disablePadding>
                <ListItem sx={{ py: 0 }}>
                  <ListItemText>
                    3.1. If the user consents to the use of Google Analytics,
                    information collected by Google Analytics will be disclosed
                    to Google. This is subject to Google's privacy policy.
                    Google Analytics is used to track events occurring during
                    the use of schema information display functionality and
                    schema normalization, as well as during the initialization
                    of Google Analytics.
                  </ListItemText>
                </ListItem>
                <ListItem sx={{ py: 0 }}>
                  <ListItemText>
                    3.2. If required by law to disclose information
                  </ListItemText>
                </ListItem>
              </List>
            </ListItem>

            <ListItem>
              <ListItemText primaryTypographyProps={{ variant: 'h6' }}>
                4. Protection of Data
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                The App implements appropriate security measures to prevent the
                leakage, loss, or unauthorized use of user data. However, please
                note that complete security of data on the internet cannot be
                guaranteed.
              </ListItemText>
            </ListItem>

            <ListItem>
              <ListItemText primaryTypographyProps={{ variant: 'h6' }}>
                5. Changes to the Privacy Policy
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                The App will periodically review and improve this Privacy
                Policy. In case of significant changes to this Privacy Policy, a
                notice will be provided within the App. Changes to the Privacy
                Policy will take effect when the updated Privacy Policy is
                published within the App.
              </ListItemText>
            </ListItem>

            <ListItem>
              <ListItemText primaryTypographyProps={{ variant: 'h6' }}>
                6. Contact
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                If you have any questions or concerns about this Privacy Policy,
                please contact the developer of the App.
              </ListItemText>
            </ListItem>

            <ListItem>
              <ListItemText>Last Updated: April 19, 2023</ListItemText>
            </ListItem>

          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
