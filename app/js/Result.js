import React, { useState } from 'react';
import { Card, CardActions, CardContent, CardHeader, Chip, Collapse, Divider, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import ClearIcon from '@mui/icons-material/Clear';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { styled } from '@mui/material/styles';

import FDRS from "3NF_SYNTHESIS"

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
      {name ?
        <Typography fontSize={fontSize} variant="body1">{name}</Typography> :
        <Typography fontSize={fontSize} variant="body1" color="text.disabled">{'"No Name"'}</Typography>
      }
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

const okSign = (nf) => {
  return (
    <Tooltip title={`This relation schema is in ${nf}.`} >
      <RadioButtonUncheckedIcon sx={{ fontSize: fontSize }} />
    </Tooltip>
  )
}
const ngSign = (nf) => {
  return (
    <Tooltip title={`This relation schema is not in ${nf}.`} >
      <ClearIcon sx={{ fontSize: fontSize }} />
    </Tooltip>
  )
}
const unknownSign = (nf) => {
  return (
    <Tooltip title={`Not sure if this schema is in ${nf} or not.`} >
      <QuestionMarkIcon sx={{ fontSize: fontSize }} />
    </Tooltip>
  )
}

const renderNormality = (diagnosis) => {
  const tableRow = {
    nf1: okSign("1NF"),
    nf2: okSign("2NF"),
    nf3: okSign("3NF"),
    bcnf: okSign("BCNF"),
    nf4: okSign("4NF"),
    pjnf: okSign("PJNF"),
  }

  const judge = diagnosis.is_definite ? ngSign : unknownSign

  switch (diagnosis.normality) {
    case "1nf":
      tableRow.nf2 = judge("2NF")
    // no break

    case "2nf":
      tableRow.nf3 = judge("3NF")
    // no break

    case "3nf":
      tableRow.bcnf = judge("BCNF")
    // no break

    case "bcnf":
      tableRow.nf4 = judge("4NF")
    // no break

    case "4nf":
      tableRow.pjnf = judge("PJNF")
    // no break

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
        {Array.from(keys).map((key, index) => {
          return (
            <Box key={`${[...key]}`}>
              <Grid spacing={2} columns={24} alignItems="center" container>
                <Grid item xs="auto">
                  <Box sx={{ width: 50 }}>
                    <Typography fontSize={fontSize} variant="h2">{`CK${index + 1}.`}</Typography>
                  </Box>
                </Grid>
                <Grid item xs>
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
                </Grid>
              </Grid>
              <Divider sx={{ my: 0.7, bgcolor: "primary.main" }} />
            </Box>
          )
        })}
      </Stack>
    </SchemaInfoItem>
  )
}

const renderOneMinimalCover = (minimalCover) => {
  return renderSchemaFDs(Array.from(minimalCover), "One of the minimal covers")
}

const RelationSchemaInfo = (props) => {
  const schema = props.schema

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
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
  )
}

const DatabaseSchemaInfo = (props) => {
  const schemas = props.schemas
  const subheader = props.subheader

  return (
    <React.Fragment>
      <Card>
        <CardHeader
          subheader={subheader}
        />

        {schemas.map((schema, index) => {
          return (
            <CardContent key={index}>
              <RelationSchemaInfo
                schema={schema}
              />
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
  let returnedComponent = (<React.Fragment></React.Fragment>)

  switch (doValue) {
    case "investigate":
      returnedComponent = (
        <DatabaseSchemaInfo
          schemas={[schema]}
          subheader={"Information of your schema"}
        />
      )
      break;

    case "synthesize":
      returnedComponent = (
        <React.Fragment>
          <Typography variant="h5" component="h2" color="text.primary">
            Schema you have given
          </Typography>
          {schema.is_in_3NF() &&
            <Typography fontSize={fontSize} variant="body1" color="warning.main">
              {"NOTE: Your schema is already in 3NF."}
            </Typography>
          }
          <DatabaseSchemaInfo
            schemas={[schema]}
            subheader={"Information of your original schema"}
          />
          <Typography variant="h5" component="h2" color="text.primary">
            Result of synthesis
          </Typography>
          <DatabaseSchemaInfo
            schemas={Array.from(FDRS.synthesize_into_3NF(schema))}
            subheader="Information of the decomposed schemas"
          />
        </React.Fragment>
      )
      break;

    default:
      throw new Error('No such action')
  }

  return returnedComponent
}
