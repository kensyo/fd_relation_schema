import React, { useState } from 'react';
import { Card, CardActions, CardContent, CardHeader, Chip, Collapse, Divider, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';

const fontSize = 16

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(-180deg)',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const SchemaInfoItem = (props) => {
  return (
    <Grid spacing={2} columns={24} alignItems="flex-start" {...props.gridContainerProps} container>
      <Grid item xs="auto">
        <Box sx={{ width: 120 }}><Typography fontSize={fontSize} variant="h2">{props.label}</Typography></Box>
      </Grid>
      <Grid item xs>
        {props.children}
      </Grid>
    </Grid>
  )
}

const renderSchemaName = (name) => {
  return (
    <SchemaInfoItem
      label="Name"
      gridContainerProps={{ alignItems: "center" }}
    >
      <Typography fontSize={fontSize} variant="body1">{name}</Typography>
    </SchemaInfoItem>
  )
}

const renderSchemaAttributes = (attributes) => {
  return (
    <SchemaInfoItem
      label="Attributes"
    >
      {attributes.length === 0 ?
        <Typography fontSize={fontSize} variant="body1">&#8709;</Typography> :
        attributes.map((attribute) => {
          return (
            <Chip
              key={attribute}
              label={attribute}
              size="small"
              color="primary"
              variant="outlined"
              sx={{ fontSize: 14, mx: 0.1 }}
            />
          )
        })}
    </SchemaInfoItem>
  )
}

const renderSchemaFDs = (fds, label = "FDs") => {
  return (
    <SchemaInfoItem
      label={label}
    >
      <Stack spacing={0} >
        {fds.length === 0 ?
          <Typography fontSize={fontSize} variant="body1">&#8709;</Typography> :
          fds.map((fd) => {
            const array_fd = JSON.parse(fd)
            const X = array_fd[0]
            const Y = array_fd[1]

            return (
              <Box key={`${X}_${Y}`}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs>
                    {X.length === 0 ?
                      <Typography fontSize={fontSize} variant="body1">&#8709;</Typography> :
                      X.map((attribute) => {
                        return (
                          <Chip
                            key={attribute}
                            label={attribute}
                            size="small"
                            color="primary"
                            variant="outlined"
                            sx={{ fontSize: 14, mx: 0.1 }}
                          />
                        )
                      })}
                  </Grid>
                  <Grid item xs="auto">
                    ➞
                  </Grid>
                  <Grid item xs>
                    {Y.length === 0 ?
                      <Typography fontSize={fontSize} variant="body1">&#8709;</Typography> :
                      Y.map((attribute) => {
                        return (
                          <Chip
                            key={attribute}
                            label={attribute}
                            size="small"
                            color="primary"
                            variant="outlined"
                            sx={{ fontSize: 14, mx: 0.1 }}
                          />
                        )
                      })}
                  </Grid>
                </Grid>
                <Divider sx={{ my: 0.7 }} />
              </Box>
            )
          })}
      </Stack>
    </SchemaInfoItem>
  )
}

const okSign = "O"
const ngSign = "X"
const unknownSign = "?"

const renderNormality = (diagnosis) => {
  const tableRow = {
    nf1: okSign,
    nf2: okSign,
    nf3: okSign,
    bcnf: okSign,
    nf4: okSign,
    pjnf: okSign,
  }

  const judgement = diagnosis.is_definite ? ngSign : unknownSign

  switch (diagnosis.normality) {
    case "1nf":
      tableRow.nf2 = judgement

    case "2nf":
      tableRow.nf3 = judgement

    case "3nf":
      tableRow.bcnf = judgement

    case "bcnf":
      tableRow.nf4 = judgement

    case "4nf":
      tableRow.pjnf = judgement

    case "pjnf":
      break

    default:
      throw new Error("Normality diagnosis failed.")
  }

  return (
    <SchemaInfoItem
      label="Normality"
    >
      <TableContainer component={Paper}>
        <Table aria-label="normality">
          <TableHead>
            <TableRow>
              <TableCell align="center">1NF</TableCell>
              <TableCell align="center">2NF</TableCell>
              <TableCell align="center">3NF</TableCell>
              <TableCell align="center">BCNF</TableCell>
              <TableCell align="center">4NF</TableCell>
              <TableCell align="center">PJNF</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell align="center">{tableRow.nf1}</TableCell>
              <TableCell align="center">{tableRow.nf2}</TableCell>
              <TableCell align="center">{tableRow.nf3}</TableCell>
              <TableCell align="center">{tableRow.bcnf}</TableCell>
              <TableCell align="center">{tableRow.nf4}</TableCell>
              <TableCell align="center">{tableRow.pjnf}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </SchemaInfoItem>
  )
}

const renderCandidateKeys = (keys) => {
  return (
    <SchemaInfoItem
      label="All the candidate keys"
    >
      <Stack spacing={0}>
        {Array.from(keys).map((key) => {
          return (
            <Box key={`${key}`}>
              {key.size === 0 ?
                <Typography fontSize={fontSize} variant="body1">&#8709;</Typography> :
                Array.from(key).map((attribute) => {
                  return (
                    <Chip
                      key={attribute}
                      label={attribute}
                      size="small"
                      color="primary"
                      variant="outlined"
                      sx={{ fontSize: 14, mx: 0.1 }}
                    />
                  )
                })
              }
              <Divider sx={{ my: 0.7 }} />
            </Box>
          )
        })}
      </Stack>
    </SchemaInfoItem>
  )
}

const renderOneMinimalCover = (minimalCover) => {
  console.log(minimalCover)
  return renderSchemaFDs(Array.from(minimalCover), "One of the minimal covers")
}

// normality
// candidate keys
// one minimal cover

const renderSchemasInformation = (schemas, subheader) => {

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <React.Fragment>
      <Card>
        <CardHeader
          subheader={subheader}
        />

        {schemas.map((schema, index) => {
          return (
            <CardContent key={index}>
              <Card>
                <CardContent>
                  <Stack spacing={2} >
                    <Box>{renderSchemaName(schema.name)}</Box>
                    <Box>{renderSchemaAttributes(Array.from(schema.attributes))}</Box>
                    <Box>{renderSchemaFDs(Array.from(schema.fds))}</Box>
                  </Stack>
                </CardContent>
                <CardActions disableSpacing>
                  <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="share"
                  >
                    <ExpandMoreIcon />
                  </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                  <CardContent>
                    <Stack spacing={2} >
                      <Box>{renderNormality(schema.diagnose_normality())}</Box>
                      <Box>{renderCandidateKeys(schema.find_all_keys())}</Box>
                      <Box>{renderOneMinimalCover(schema.find_minimal_cover())}</Box>
                    </Stack>
                  </CardContent>
                </Collapse>
              </Card>
            </CardContent>
          )
        })}

      </Card>
    </React.Fragment>
  )

}

export default (props) => {
  const schema = props.schema
  const doValue = props.doValue

  return (
    renderSchemasInformation([schema, schema], "Information of your schema")
  )
}

