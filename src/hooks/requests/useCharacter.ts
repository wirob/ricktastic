import useSWR from 'swr'
import type { Info, Character } from 'rickmortyapi/dist/interfaces'
import fetcher from 'lib/fetcher'

type CharacterQuery = {
  name?: string
  status?: 'dead' | 'alive' | 'unknown'
  gender?: 'female' | 'male' | 'genderless' | 'unknown'
}

function useCharacter(characterQuery?: CharacterQuery) {
  let urlParams

  if (characterQuery && Object.keys(characterQuery).length !== 0) {
    urlParams = new URLSearchParams(characterQuery).toString()
  }

  const { data, error, isLoading } = useSWR<Info<Character>>(
    [`https://rickandmortyapi.com/api/character`, urlParams]
      .filter(Boolean)
      .join('/?'),
    fetcher
  )

  return {
    character: data,
    isLoading,
    isError: error,
  }
}

export default useCharacter
