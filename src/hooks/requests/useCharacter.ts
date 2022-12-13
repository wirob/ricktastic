import useSWR from 'swr'
import type { Info, Character } from 'rickmortyapi/dist/interfaces'
import fetcher from 'src/lib/fetcher'

function useCharacter() {
  const { data, error, isLoading } = useSWR<Info<Character>>(
    'https://rickandmortyapi.com/api/character',
    fetcher
  )

  return {
    character: data,
    isLoading,
    isError: error,
  }
}

export default useCharacter
