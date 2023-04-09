import { Menu as MenuIcon } from '@mui/icons-material'
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material'
import React, { useContext } from 'react'
import Context from './Context'

export default (_props) => {
  const {mobileOpen, setMobileOpen} = useContext(Context)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  return (
    <React.Fragment>
      <AppBar sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="h1">
            Scrutinize and normalize fd schemas
          </Typography>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  )
}
