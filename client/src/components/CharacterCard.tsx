import React from 'react'
import {
  Card,
  CardContent,
  CardMedia,
  Theme,
  Typography,
  makeStyles,
} from '@material-ui/core'

interface CharacterCardProps {
  character: Character
}

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
  root: {
    width: 400,
  },
  media: {
    height: 360,
  },
}))

const CharacterCard: React.FC<CharacterCardProps> = (props) => {
  const { character } = props

  const classes = useStyles()
  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={character.image}
        title={`A photo of ${character.name}`}
      />
      <CardContent>
        <Typography variant="h5">Name</Typography>
        <Typography>{character.name}</Typography>
        <Typography variant="h5">Species</Typography>
        <Typography>{character.species}</Typography>
        <Typography variant="h5">Origin</Typography>
        <Typography>{character.origin.name || ''}</Typography>
        <Typography variant="h5">Status</Typography>
        <Typography>{character.status}</Typography>
      </CardContent>
    </Card>
  )
}

export default CharacterCard
