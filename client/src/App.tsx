import React from 'react'
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Theme,
  makeStyles,
} from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    marginTop: '10%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 110,
  },
}))

const genders = ['Female', 'Male', 'Genderless', 'unknown']
const statuses = ['Alive', 'Dead', 'unknown']

const SearchField: React.FC = () => {
  const classes = useStyles()

  return (
    <div className={classes.wrapper}>
      <TextField label="Name" variant="outlined" />
      <FormControl className={classes.formControl}>
        <InputLabel>Gender</InputLabel>
        <Select>
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {genders.map((gender) => (
            <MenuItem value={gender}>{gender}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel>Status</InputLabel>
        <Select>
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {statuses.map((status) => (
            <MenuItem value={status}>{status}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}

const App: React.FC = () => {
  const classes = useStyles()

  const handleClick = () => {
    fetch('/api/characters/random')
      .then((res) => res.json())
      .then(console.log)
  }

  return (
    <div style={{ width: '100%' }}>
      <div className={classes.wrapper}>
        <Button variant="contained" color="secondary" onClick={handleClick}>
          Get a random character
        </Button>
      </div>
      <div>or</div>
      <SearchField />
    </div>
  )
}

export default App
