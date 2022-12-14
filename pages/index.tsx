import Error from 'next/error'
import { Typography } from '@mui/material'
import useCharacter from 'hooks/requests'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material'
import { useState } from 'react'

type Gender = 'female' | 'male' | 'genderless' | 'unknown'
type Status = 'dead' | 'alive' | 'unknown'

export default function Home() {
  const [name, setName] = useState('')
  const [status, setStatus] = useState<Status | ''>('')
  const [gender, setGender] = useState<Gender | ''>('')
  const [searchParams, setSearchParams] = useState<SearchParams | undefined>()

  // Calls on this to get the current character count
  const { character, isError, isLoading } = useCharacter()

  const handleStatusChange = (event: SelectChangeEvent) =>
    setStatus(event.target.value as Status)

  const handleGenderChange = (event: SelectChangeEvent) =>
    setGender(event.target.value as Gender)

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setName(event.target.value)

  const handleOnClick = () => {
    setSearchParams({ name, status, gender })
  }

  if (isLoading) return null

  if (isError) return <Error statusCode={500} />

  if (!character || !character.info) return <Error statusCode={500} />

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        There are currently {character.info.count} characters
      </Typography>

      <Box display="flex" alignItems="center">
        <TextField
          label="Name"
          onChange={handleNameChange}
          variant="standard"
          value={name}
        />

        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-standard-label">Status</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={status}
            onChange={handleStatusChange}
            label="Status"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="alive">Alive</MenuItem>
            <MenuItem value="dead">Dead</MenuItem>
            <MenuItem value="unknown">Unknown</MenuItem>
          </Select>
        </FormControl>

        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-standard-label">Gender</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={gender}
            onChange={handleGenderChange}
            label="Gender"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="genderless">Genderless</MenuItem>
            <MenuItem value="unknown">Unknown</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Button variant="contained" onClick={handleOnClick}>
        Find my character!
      </Button>

      {searchParams && <SearchResult searchParams={searchParams} />}
    </div>
  )
}

type SearchParams = {
  name: string
  status: Status
  gender: Gender
}

type SearchResultProps = {
  searchParams: SearchParams
}

function SearchResult(props: SearchResultProps) {
  const { searchParams } = props

  const { character, isError, isLoading } = useCharacter(searchParams)

  if (isLoading) return <CircularProgress />

  if (isError) return <div>No results</div>

  return (
    <Grid container spacing={2}>
      {character?.results?.map((char) => (
        <Grid item md={4} xl={2} xs={6} key={char.id}>
          <Card>
            <CardMedia component="img" image={char.image} height={140} />
            <CardContent>
              <Typography gutterBottom variant="h5">
                {char.name}
              </Typography>
              <Box display="flex">
                <Typography variant="body2">
                  Location: {char.location.name}
                </Typography>
              </Box>
              <Typography variant="body2">
                Origin: {char.origin.name}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}
