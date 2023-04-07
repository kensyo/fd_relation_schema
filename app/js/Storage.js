import {
  Box,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Switch,
  TextField,
  Tooltip,
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
import config from '../config.json'

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
  const {
    name,
    attributes,
    fds,
    isLocked,
    currentDataID,
    setCurrentDataID,
    fetchDatas,
    autoSave,
    dispatch,
  } = props

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
      isLocked: false,
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
      isLocked,
    })

    setAnchorEl(null)

    fetchDatas()
  }

  const onClickSaveAsNew = async () => {
    const id = await schema_datas.add({
      name,
      attributes: getNormalizedAttiributes(attributes),
      fds,
      title: currentDataID
        ? '🔁 ' + (await schema_datas.get(currentDataID)).title
        : 'A New Schema',
      isLocked,
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

  // for auto-saving
  useEffect(() => {
    if (!autoSave) {
      return
    }

    if (currentDataID) {
      // I don't know why initialization hasn't been completed
      onClickSave().catch((e) => {
        if (e.name !== 'IDBConnectionError') {
          throw e
        }
      })
    } else {
      // I don't know why initialization hasn't been completed
      onClickSaveAsNew().catch((e) => {
        if (e.name !== 'IDBConnectionError') {
          throw e
        }
      })
    }
  }, [name, attributes, fds])

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
  const { name, attributes, fds, isLocked, dispatch } = props

  const [currentDataID, setCurrentDataID] = useState(null)
  const [datas, setDatas] = useState([])
  const [editingID, setEditingID] = useState(null)
  const [editingText, setEditingText] = useState('')

  const [autoSave, setAutoSave] = useState(() => {
    const storedData = localStorage.getItem(
      config.localstorage_key_for_autosave
    )
    if (storedData) {
      return JSON.parse(storedData)
    } else {
      return false
    }
  })

  const fetchDatas = async () => {
    let allDatas
    try {
      allDatas = await schema_datas.getAll({ order: 'prev' })
    } catch (e) {
      // I don't know why initialization hasn't been completed
      if (e.name !== 'IDBConnectionError') {
        throw e
      }
      await schema_datas.database.open()
      allDatas = await schema_datas.getAll({ order: 'prev' })
    }
    setDatas(allDatas)
  }

  useEffect(() => {
    fetchDatas()
  }, [])

  return (
    <Box sx={{ m: 4 }}>
      <FormControl component="fieldset">
        <FormGroup aria-label="editing-option">
          <FormControlLabel
            control={
              <Switch
                color="primary"
                checked={autoSave}
                onClick={(event) => {
                  setAutoSave(event.target.checked)
                  localStorage.setItem(
                    config.localstorage_key_for_autosave,
                    `${event.target.checked}`
                  )
                }}
              />
            }
            label="Auto-Save"
            labelPlacement="end"
          />
          <FormControlLabel
            disabled={currentDataID ? false : true}
            control={
              <Switch
                color="secondary"
                checked={isLocked}
                onClick={async (event) => {
                  const checked = event.target.checked
                  dispatch({
                    type: 'isLocked_change',
                    value: checked,
                  })
                  const data = await schema_datas.get(currentDataID)
                  await schema_datas.update({
                    ...data,
                    isLocked: checked,
                  })
                  fetchDatas()
                }}
              />
            }
            label="Lock"
            labelPlacement="end"
          />
        </FormGroup>
      </FormControl>
      <SaveMenu
        name={name}
        attributes={attributes}
        fds={fds}
        isLocked={isLocked}
        dispatch={dispatch}
        currentDataID={currentDataID}
        setCurrentDataID={setCurrentDataID}
        fetchDatas={fetchDatas}
        autoSave={autoSave}
      />
      <List>
        {datas.map((data) => (
          <ListItem
            key={data.id}
            disablePadding
            secondaryAction={
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
                  disabled={data.isLocked}
                  edge="end"
                  aria-label="delete"
                  onClick={async () => {
                    await schema_datas.delete(data.id)

                    if (currentDataID === data.id) {
                      setCurrentDataID(null)
                    }
                    fetchDatas()
                  }}
                >
                  <DeleteForeverIcon />
                </IconButton>
              </>
            }
          >
            <ListItemButton
              sx={{ height: '48px' }}
              selected={data.id === currentDataID}
              onClick={async () => {
                const schema_data = await schema_datas.get(data.id)
                dispatch({ type: 'name_change', value: schema_data.name })
                dispatch({
                  type: 'attributes_change',
                  value: schema_data.attributes,
                })
                dispatch({ type: 'fds_change', value: schema_data.fds })
                dispatch({
                  type: 'isLocked_change',
                  value: schema_data.isLocked,
                })
                setCurrentDataID(data.id)
              }}
            >
              {data.id === editingID ? (
                <StyledFocusedTextField
                  sx={{ width: 'calc(100% - 32px)' }}
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
                  onBlur={async (event) => {
                    await schema_datas.update({
                      ...data,
                      title: event.target.value,
                    })
                    fetchDatas()
                    setEditingText('')
                    setEditingID(null)
                  }}
                />
              ) : (
                <Tooltip
                  title={data.title}
                  placement="right-start"
                  enterDelay={500}
                  enterNextDelay={500}
                >
                  <ListItemText
                    primary={data.title || 'No Title'}
                    primaryTypographyProps={{
                      width: 'calc(100% - 32px)',
                      noWrap: true,
                      color: data.title ? 'text.primary' : 'text.disabled',
                    }}
                  />
                </Tooltip>
              )}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}

export default Storage
