import React, { useState } from 'react';
import { Autocomplete, TextField, Grid, Button, Stack } from '@mui/material';

import FDRS from "3NF_SYNTHESIS"
import Result from './Result';

const options = [
  { value: "scrutinize", label: "Scrutinize the schema" },
  { value: "synthesize", label: "Normalize into 3NF by synthesis" },
]

const createSchema = (name, attributesRaw, fdsRaw) => {
  const attributes = attributesRaw.map(x => x.value)

  const fds = []
  for (const data of fdsRaw) {
    const dataLHS = data[0]
    const X = dataLHS.map(x => x.value)

    const dataRHS = data[1]
    const Y = dataRHS.map(x => x.value)

    fds.push([X, Y]) // adding X->Y to FDs
  }

  return new FDRS.FdRelationSchema(
    name,
    attributes,
    fds
  )
}

export default (props) => {
  const [value, setValue] = useState(null)
  const [doValue, setDoValue] = useState(null)
  const [schema, setSchema] = useState(null)

  const name = props.name
  const attributesRaw = props.attributesRaw
  const fdsRaw = props.fdsRaw

  return (
    <Stack spacing={2}>
      <Grid container spacing={1} alignItems="Center">
        <Grid item xs={5}>
          <Autocomplete
            options={options}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Action"
                size="small"
                InputLabelProps={{ shrink: true }}
                placeholder={"Choose action..."}
              />
            )}
            value={value}
            onChange={(event, value, reason) => {
              setValue(value)
            }}
          />
        </Grid>
        <Grid item xs={0}>
          <Button variant="outlined" color="primary" onClick={() => {
            if (!value) {
              return
            }

            setDoValue(value.value)

            const schema = createSchema(name, attributesRaw, fdsRaw)
            setSchema(schema)
          }}>
            Do
          </Button>
        </Grid>
      </Grid>
      {doValue && schema &&
        <Result
          schema={schema}
          doValue={doValue}
        />
      }
    </Stack>
  )
}
