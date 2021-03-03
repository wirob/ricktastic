import React, { useState } from 'react'
import { Button, Theme, makeStyles } from '@material-ui/core'
import CharacterCard from './CharacterCard'

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    marginTop: theme.spacing(4),
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  randomCharWrapper: {
    marginTop: theme.spacing(4),
    display: 'flex',
    justifyContent: 'center',
  },
}))

const RandomCharacter: React.FC = () => {
  const classes = useStyles()

  const [currentRandom, setCurrentRandom] = useState<any>()

  const getRandomCharacter = () => {
    fetch('/api/characters/random')
      .then((res) => res.json())
      .then(setCurrentRandom)
  }

  return (
    <div>
      <div className={classes.wrapper}>
        <Button
          variant="contained"
          color="secondary"
          onClick={getRandomCharacter}
        >
          Get a random character
        </Button>
      </div>
      {currentRandom && (
        <div className={classes.randomCharWrapper}>
          <CharacterCard character={currentRandom} />
        </div>
      )}
    </div>
  )
}

export default RandomCharacter
