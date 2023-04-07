import React, { useReducer, useState } from 'react'
import {
  Stack,
  Container,
  Typography,
  Box,
  Button,
  Divider,
  Grid,
} from '@mui/material'
import Name from './Name'
import Attributes from './Attributes'
import FD from './FD'
import Action from './Action'
import { v4 as uuidv4 } from 'uuid'

import FDRS from '3NF_SYNTHESIS'
import Storage from './Storage'

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

export default () => {
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

  return (
    <Container maxWidth="lg">
      <Grid container>
        <Grid item xs={3}>
          <Storage
            name={name}
            attributes={attributes}
            fds={fds}
            isLocked={isLocked}
            dispatch={dispatch}
          />
        </Grid>
        <Grid item xs={9}>
          <Box sx={{ my: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              Scrutinize and normalize fd relation schema
            </Typography>

            <Stack spacing={2}>
              <Typography variant="body1" gutterBottom>
                {' '}
                Enter your schema information(Name, Attributes, and FDs) and
                choose action.{' '}
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
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}
