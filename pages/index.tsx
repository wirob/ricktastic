import Error from 'next/error'
import { Typography } from '@mui/material'
import useCharacter from '../src/hooks/requests'

export default function Home() {
  const { character, isError, isLoading } = useCharacter()

  if (isLoading) return null

  if (isError) return <Error statusCode={500} />

  return (
    <div>
      <Typography variant="h1">hi there!</Typography>
    </div>
  )
}
