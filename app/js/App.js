import React, { useReducer } from 'react';
import { Grid, Stack, Container, Typography, Box, InputLabel, FormHelperText, Button } from '@mui/material';
import Name from './Name';
import Attributes from './Attributes';
import FD from './FD';

function reducer(state, action) {
  switch (action.type) {
    // for state.name
    case "name_change":
      return {
        name: action.value,
        ...state,
      }

    // for state.attributes
    case "attributes_change":
      return {
        ...state,
        attributes: action.value
      }

    // for state.fds
    case "fds_change":
      return {
        ...state,
        fds: action.value
      }

    default:
      return state
  }
}

export default () => {
  const [{ name, attributes, fds }, dispatch] = useReducer(reducer, {
    name: "",
    attributes: [],
    fds: [
      [[], []] // [LHSarray, RHSarray]
    ]
  })

  const handleClick = () => {
    const newFDs = [...fds]
    newFDs.push([[], []])
    dispatch({ type: "fds_change", value: newFDs })
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Normalize and investigate fd scheme
        </Typography>
        <Stack spacing={2}>
          <p> Enter your scheme information: Name, Attributes, and FDs. </p>
          <Box sx={{ flexGrow: 2 }}>
            <Name
              value={name}
              dispatch={dispatch}
            />
          </Box>
          <Box sx={{ flexGrow: 2 }}>
            <Attributes
              value={attributes}
              dispatch={dispatch}
            />
          </Box>
        </Stack>
      </Box>
    </Container >
  );
};

