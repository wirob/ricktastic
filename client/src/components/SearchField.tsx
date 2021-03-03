import React, { useState } from 'react'
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
import CharacterCard from './CharacterCard'

interface Character {
  created: string
  episode: string[]
  gender: string
  id: number
  image: string
  location: {
    name: string
    url: string
  }
  name: string
  origin: {
    name: string
    url: string
  }
  species: string
  status: string
  type: string
  url: string
}

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

const genders = ['Female', 'Male', 'Genderless', 'unknown']
const statuses = ['Alive', 'Dead', 'unknown']

const SearchField: React.FC = () => {
  const classes = useStyles()

  const [name, setName] = useState('')
  const [gender, setGender] = useState<Gender>('')
  const [status, setStatus] = useState<Status>('')
  const [characters, setCharacters] = useState<undefined | Character[]>()

  const handleGenderChange = (event: Event) => {
    setGender(event.target.value as Gender)
  }

  const handleStatusChange = (event: Event) => {
    setStatus(event.target.value as Status)
  }

  const buildQuery = () => {
    return `/api/characters?name=${name || ''}${gender && `&gender=${gender}`}${
      status && `&status=${status}`
    }`
  }

  const handleClick = () => {
    fetch(buildQuery())
      .then((res) => res.json())
      .then((res) => setCharacters(res.results))
  }

  return (
    <>
      <div className={classes.wrapper}>
        <div className={classes.searchParams}>
          <TextField
            onChange={(event) => setName(event.target.value)}
            label="Name"
            value={name}
            variant="outlined"
          />
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
      <div>
        {characters &&
          characters.map((character: Character) => (
            <CharacterCard character={character} />
          ))}
      </div>
    </>
  )
}

export default SearchField
