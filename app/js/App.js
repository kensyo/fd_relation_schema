import { Stack, Container, Typography, Box } from '@mui/material';
import React, { Fragment, useReducer } from 'react';
import Name from './Name';

function reducer(state, action) {
  switch (action.type) {
    case "name_input":
      return {
        name: action.value,
        ...state,
      }

    default:
      break;
  }
}

export default () => {
  const [{ name, attributes, fds }, dispatch] = useReducer(reducer, {
    name: "",
    attributes: [],
    FDs: [
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
          <Name
            value={name}
            dispatch={dispatch}
          />
          <p>hoge</p>
        </Stack>
      </Box>
    </Container >
  );
};

