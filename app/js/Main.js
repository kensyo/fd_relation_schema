import React, { useReducer } from 'react'
import {
  Stack,
  Container,
  Typography,
  Box,
  Button,
  Divider,
} from '@mui/material'
import Name from './Name'
import Attributes from './Attributes'
import FD from './FD'
import Action from './Action'
import { v4 } from 'uuid'

import FDRS from '3NF_SYNTHESIS'

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

  default:
    return state
  }
}

export default () => {
  const [{ name, attributes, fds }, dispatch] = useReducer(reducer, {
    name: '',
    attributes: [],
    fds: [
      [[], [], v4()], // [LHSarray, RHSarray, uuid]
    ],
  })

  const handleClick = () => {
    const newFDs = [...fds]
    newFDs.push([[], [], v4()])
    dispatch({ type: 'fds_change', value: newFDs })
  }

  const shouldPutPlaceholder = name === '' && attributes.length === 0

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Scrutinize and normalize fd relation schema
        </Typography>

        <Stack spacing={2}>
          <Typography variant="body1" gutterBottom>
            {' '}
            Enter your schema information(Name, Attributes, and FDs) and choose
            action.{' '}
          </Typography>
          <Name
            placeholder={shouldPutPlaceholder ? 'example: vegetables' : ''}
            value={name}
            dispatch={dispatch}
          />
          <Attributes
            placeholder={
              shouldPutPlaceholder
                ? 'vegetable_name, grower, growing_area, price'
                : ''
            }
            value={attributes}
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
              />
            ))}
            <Button
              variant="contained"
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
    </Container>
  )
}
