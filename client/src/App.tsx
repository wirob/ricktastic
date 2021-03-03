import React, { useState } from 'react'
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Theme,
  Typography,
  makeStyles,
} from '@material-ui/core'
import RandomCharacter from './components/RandomCharacter'

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    marginTop: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  searchParams: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchButtonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 110,
  },
}))

type Event = React.ChangeEvent<{
  name?: string | undefined
  value: unknown
}>

type Status = 'Alive' | 'Dead' | 'unknown' | ''
type Gender = 'Female' | 'Male' | 'Genderless' | 'unknown' | ''

interface SearchParams {
  status: Status
  gender: Gender
}

const genders = ['Female', 'Male', 'Genderless', 'unknown']
const statuses = ['Alive', 'Dead', 'unknown']

interface SearchFieldProps {
  handleQuery: (params: SearchParams) => void
}

const SearchField: React.FC<SearchFieldProps> = (props) => {
  const { handleQuery } = props
  const classes = useStyles()

  const [gender, setGender] = useState<Gender>('')
  const [status, setStatus] = useState<Status>('')

  const handleGenderChange = (event: Event) => {
    setGender(event.target.value as Gender)
  }

  const handleStatusChange = (event: Event) => {
    setStatus(event.target.value as Status)
  }

  const handleClick = () => {
    handleQuery({ gender, status })
  }

  return (
    <div className={classes.wrapper}>
      <div className={classes.searchParams}>
        <TextField label="Name" variant="outlined" />
        <FormControl className={classes.formControl}>
          <InputLabel id="gender-select-label">Gender</InputLabel>
          <Select
            labelId="gender-select-label"
            value={gender}
            onChange={handleGenderChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {genders.map((gender) => (
              <MenuItem key={gender} value={gender}>
                {gender}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel id="status-select-label">Status</InputLabel>
          <Select
            labelId="status-select-label"
            value={status}
            onChange={handleStatusChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {statuses.map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className={classes.searchButtonContainer}>
        <Button onClick={handleClick} color="primary" variant="contained">
          Search
        </Button>
      </div>
    </div>
  )
}

const App: React.FC = () => {
  const classes = useStyles()

  const handleQuery = (params: SearchParams) => {
    console.log(params)
  }

  return (
    <div style={{ width: '100%' }}>
      <RandomCharacter />
      <div className={classes.wrapper}>
        <Typography variant="h4">-------- OR --------</Typography>
      </div>
      <SearchField handleQuery={handleQuery} />
    </div>
  )
}

export default App
