import React, { useReducer } from 'react';
import { Grid, Stack, Container, Typography, Box, Button } from '@mui/material';
import Name from './Name';
import Attributes from './Attributes';
import FD from './FD';

function reducer(state, action) {
  switch (action.type) {
    // for state.name
    case "name_change":
      return {
        ...state,
        name: action.value,
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

  const shouldPutPlaceholder =
    name === "" &&
    attributes.length === 0

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
              placeholder={shouldPutPlaceholder ? "example: vegetables" : ""}
              value={name}
              dispatch={dispatch}
            />
          </Box>
          <Box sx={{ flexGrow: 2 }}>
            <Attributes
              placeholder={shouldPutPlaceholder ? "vegetable_name, grower, growing_area, price" : ""}
              value={attributes}
              dispatch={dispatch}
              fds={fds}
            />
          </Box>
          <Box sx={{ flexGrow: 2 }}>
            <Grid container rowSpacing={1}>
              {
                fds.map((fd, index) =>
                  <Grid key={index} container item spacing={1} alignItems="Center">
                    <FD
                      placeholders={
                        shouldPutPlaceholder ?
                          ["vegetable_name, grower", "price"] :
                          ["", ""]
                      }
                      options={attributes}
                      leftValue={fd[0]}
                      rightValue={fd[1]}
                      dispatch={dispatch}
                      index={index}
                      fds={fds}
                    />
                  </Grid>
                )
              }
              <Grid item>
                <Button variant="contained" onClick={handleClick}>
                  Add another FD
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Stack>
      </Box>
    </Container >
  );
};
