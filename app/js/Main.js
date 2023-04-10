import React, { useContext, useReducer } from 'react'
import {
  Stack,
  Container,
  Typography,
  Box,
  Button,
  Divider,
  Drawer,
  Toolbar,
} from '@mui/material'
import Name from './Name'
import Attributes from './Attributes'
import FD from './FD'
import Action from './Action'
import { v4 as uuidv4 } from 'uuid'

import FDRS from '3NF_SYNTHESIS'
import Storage from './Storage'
import Context from './Context'
import useCurrentBreakpoint from './hooks/useCurrentBreakpoint'

function reducer(state, action) {
  switch (action.type) {
    // for state.name
    case 'name_change':
      return {
        ...state,
        name: action.value,
      }

    // for state.attributes
    case 'attributes_change':
      return {
        ...state,
        attributes: action.value,
      }

    // for state.fds
    case 'fds_change':
      return {
        ...state,
        fds: action.value,
      }

    case 'isLocked_change':
      return {
        ...state,
        isLocked: action.value,
      }

    default:
      throw new Error('No such dispatch action: ' + action.type)
  }
}

const drawerWidth = 240

export default (props) => {
  const { window } = props
  const [{ name, attributes, fds, isLocked }, dispatch] = useReducer(reducer, {
    name: '',
    attributes: [],
    fds: [
      [[], [], uuidv4()], // [LHSarray, RHSarray, uuid]
    ],
    isLocked: false,
  })

  const handleClick = () => {
    const newFDs = [...fds]
    newFDs.push([[], [], uuidv4()])
    dispatch({ type: 'fds_change', value: newFDs })
  }

  const shouldPutPlaceholder = name === '' && attributes.length === 0

  const { mobileOpen, setMobileOpen } = useContext(Context)

  const drawer = (
    <>
      <Toolbar />
      <Storage
        name={name}
        attributes={attributes}
        fds={fds}
        isLocked={isLocked}
        dispatch={dispatch}
      />
    </>
  )

  const container =
    window !== undefined ? () => window().document.body : undefined

  return (
    <Container maxWidth="100%" sx={{ display: 'flex' }}>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="save menu"
      >
        {'xs' === useCurrentBreakpoint() ? (
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={() => {
              setMobileOpen(!mobileOpen)
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
        ) : (
          <Drawer
            variant="permanent"
            sx={{
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        )}
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Container maxWidth="md" sx={{ py: 2 }}>
          <Toolbar />
          <Stack spacing={2}>
            <Typography variant="body1" gutterBottom>
              Enter your schema information(Name, Attributes, and FDs) and
              choose action.
            </Typography>
            <Name
              placeholder={shouldPutPlaceholder ? 'example: vegetables' : ''}
              value={name}
              isLocked={isLocked}
              dispatch={dispatch}
            />
            <Attributes
              placeholder={
                shouldPutPlaceholder
                  ? 'vegetable_name, grower, growing_area, price'
                  : ''
              }
              value={attributes}
              isLocked={isLocked}
              dispatch={dispatch}
              fds={fds}
            />
            <Stack spacing={1}>
              {fds.map((fd, index) => (
                <FD
                  key={fd[2]}
                  placeholders={
                    shouldPutPlaceholder
                      ? ['vegetable_name, grower', 'price']
                      : ['', '']
                  }
                  options={attributes}
                  leftValue={fd[0]}
                  rightValue={fd[1]}
                  dispatch={dispatch}
                  index={index}
                  fds={fds}
                  isLocked={isLocked}
                />
              ))}
              <Button
                variant="contained"
                disabled={isLocked}
                onClick={handleClick}
                sx={{ width: 160 }}
              >
                Add another FD
              </Button>
            </Stack>

            <Divider variant="middle" />

            <Box sx={{ flexGrow: 2 }}>
              <Action name={name} attributesRaw={attributes} fdsRaw={fds} />
            </Box>
            <Divider variant="middle" />
          </Stack>
        </Container>
      </Box>
    </Container>
  )
}
