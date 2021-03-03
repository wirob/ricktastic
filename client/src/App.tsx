import React from 'react'
import { Theme, Typography, makeStyles } from '@material-ui/core'
import RandomCharacter from './components/RandomCharacter'
import SearchField from './components/SearchField'

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    marginTop: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
}))

const App: React.FC = () => {
  const classes = useStyles()

  return (
    <div style={{ width: '100%' }}>
      <RandomCharacter />
      <div className={classes.wrapper}>
        <Typography variant="h4">-------- OR --------</Typography>
      </div>
      <SearchField />
    </div>
  )
}

export default App
