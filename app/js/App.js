import React, { useReducer } from 'react';
import { Stack, Container, Typography, Box, InputLabel, FormHelperText } from '@mui/material';
import Name from './Name';
import Attributes from './Attributes';

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

    default:
      break;
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


  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Normalize and investigate fd scheme
        </Typography>
        <Stack spacing={0.5}>
          <p> Enter your scheme information. </p>
          <Box sx={{ flexGrow: 2 }}>
            <InputLabel>Name</InputLabel>
            <Name
              value={name}
              dispatch={dispatch}
            />
          </Box>
          <Box sx={{ flexGrow: 2 }}>
            <InputLabel>Attributes</InputLabel>
            <Attributes
              value={attributes}
              dispatch={dispatch}
            />
            <FormHelperText>🍵 Press enter key to confirm your input.</FormHelperText>
          </Box>
          <Box sx={{ flexGrow: 2 }}>
          </Box>
        </Stack>
      </Box>
    </Container >
  );
};

