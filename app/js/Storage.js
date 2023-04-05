import {
  Box,
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemText,
  Menu,
  MenuItem,
  TextField,
} from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import SaveAsIcon from '@mui/icons-material/SaveAs'
import SaveIcon from '@mui/icons-material/Save'
import ClearAllIcon from '@mui/icons-material/ClearAll'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import EditIcon from '@mui/icons-material/Edit'
import AddIcon from '@mui/icons-material/Add'
import { styled, alpha } from '@mui/material/styles'
import database from './idbloader'
import { v4 as uuidv4 } from 'uuid'

const schema_datas = database.getObjectstore('schema_datas')

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light'
        ? 'rgb(55, 65, 81)'
        : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}))

function getNormalizedAttiributes(attributes) {
  const result = []
  for (const attribute of attributes) {
    const copied = Object.assign({}, attribute)
    copied.isDuplicated = false
    result.push(copied)
  }

  return result
}

function SaveMenu(props) {
  const { name, attributes, fds, currentDataID, setCurrentDataID, fetchDatas, dispatch } =
    props

  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const onClickNew = async () => {
    if (!currentDataID) {
      throw new Error('A initial schema exists.')
    }

    const name = ''
    const attributes = []
    const fds = [[[], [], uuidv4()]]

    const id = await schema_datas.add({
      name,
      attributes,
      fds,
      title: 'A New Schema',
    })

    dispatch({ type: 'name_change', value: name })
    dispatch({
      type: 'attributes_change',
      value: attributes,
    })
    dispatch({ type: 'fds_change', value: fds })

    setCurrentDataID(id)

    setAnchorEl(null)

    fetchDatas()
  }

  const onClickSave = async () => {
    if (!currentDataID) {
      throw new Error('currentDataID doesn\'t exist')
    }

    const title = (await schema_datas.get(currentDataID)).title

    await schema_datas.update({
      id: currentDataID,
      name,
      attributes: getNormalizedAttiributes(attributes),
      fds,
      title,
    })

    setAnchorEl(null)

    fetchDatas()
  }

  const onClickSaveAsNew = async () => {
    const id = await schema_datas.add({
      name,
      attributes: getNormalizedAttiributes(attributes),
      fds,
      title: name || 'No Name',
    })

    setCurrentDataID(id)

    setAnchorEl(null)

    fetchDatas()
  }

  const onClickClearAllData = async () => {
    await schema_datas.clear()

    setCurrentDataID(null)

    setAnchorEl(null)

    fetchDatas()
  }

  return (
    <div>
      <Button
        // aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        Options
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem
          onClick={onClickNew}
          disableRipple
          disabled={currentDataID ? false : true}
        >
          <AddIcon />
          New
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem
          onClick={onClickSave}
          disableRipple
          disabled={currentDataID ? false : true}
        >
          <SaveIcon />
          Save (overwrite)
        </MenuItem>
        <MenuItem onClick={onClickSaveAsNew} disableRipple>
          <SaveAsIcon />
          Save as new
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={onClickClearAllData} disableRipple>
          <ClearAllIcon />
          Clear all the data(dialog)
        </MenuItem>
      </StyledMenu>
    </div>
  )
}

function FocusedTextField(props) {
  const inputRef = useRef(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  return <TextField inputRef={inputRef} {...props} />
}

const StyledFocusedTextField = styled(FocusedTextField)`
  & .MuiInputBase-root {
    border: none;
    background-color: transparent;
    box-shadow: none;
  }

  & .MuiInputBase-input {
    padding: 0;
  }
`

const Storage = (props) => {
  const { name, attributes, fds, dispatch } = props

  const [currentDataID, setCurrentDataID] = useState(null)
  const [datas, setDatas] = useState([])
  const [editingID, setEditingID] = useState(null)
  const [editingText, setEditingText] = useState('')

  const fetchDatas = async () => {
    // I don't know why validation is needed here.
    if (!schema_datas.database.db) {
      await schema_datas.database.open()
    }
    const allDatas = await schema_datas.getAll({ order: 'prev' })
    setDatas(allDatas)
  }

  useEffect(() => {
    fetchDatas()
  }, [])

  return (
    <Box sx={{ m: 4 }}>
      <SaveMenu
        name={name}
        attributes={attributes}
        fds={fds}
        dispatch={dispatch}
        currentDataID={currentDataID}
        setCurrentDataID={setCurrentDataID}
        fetchDatas={fetchDatas}
      />
      <List>
        {datas.map((data) => (
          <ListItem key={data.id} disablePadding>
            <ListItemButton
              sx={data.id === currentDataID ? { bgcolor: 'text.disabled' } : {}}
              onClick={async () => {
                const schema_data = await schema_datas.get(data.id)
                dispatch({ type: 'name_change', value: schema_data.name })
                dispatch({
                  type: 'attributes_change',
                  value: schema_data.attributes,
                })
                dispatch({ type: 'fds_change', value: schema_data.fds })
                setCurrentDataID(data.id)
              }}
            >
              {data.id === editingID ? (
                <StyledFocusedTextField
                  value={editingText}
                  onChange={(event) => {
                    setEditingText(event.target.value)
                  }}
                  onKeyPress={(event) => {
                    if (event.key === 'Enter') {
                      event.target.blur()
                    }
                  }}
                  size="small"
                  onBlur={(event) => {
                    schema_datas.update({
                      ...data,
                      title: event.target.value,
                    })
                    fetchDatas()
                    setEditingText('')
                    setEditingID(null)
                  }}
                />
              ) : (
                <ListItemText
                  primary={data.title || 'No Title'}
                  primaryTypographyProps={{
                    noWrap: true,
                    color: data.title ? 'text.primary' : 'text.disabled',
                  }}
                />
              )}
            </ListItemButton>
            <ListItemSecondaryAction>
              <>
                <IconButton
                  edge="end"
                  aria-label="edit"
                  onClick={async () => {
                    setEditingID(data.id)
                    setEditingText(data.title)
                  }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={async () => {
                    await schema_datas.delete(data.id)

                    setCurrentDataID(null)
                    fetchDatas()
                  }}
                >
                  <DeleteForeverIcon />
                </IconButton>
              </>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}

export default Storage
