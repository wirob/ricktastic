import { renderHook } from '@testing-library/react-hooks'
import useCharacter from 'hooks/requests'

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ character: 'foobar' }),
  })
) as jest.Mock

describe('useCharacter', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  describe('returns', () => {
    it('the correct data structure', async () => {
      const { result, waitForNextUpdate } = renderHook(() => useCharacter())

      await waitForNextUpdate()

      expect(result.current).toHaveProperty('character')
      expect(result.current).toHaveProperty('isError')
      expect(result.current).toHaveProperty('isLoading')
    })
  })

  describe('calls on fetch', () => {
    test('only once', async () => {
      const { waitForNextUpdate } = renderHook(() => useCharacter())

      await waitForNextUpdate()

      expect(global.fetch).toHaveBeenCalledTimes(1)
    })

    describe('with the right url', () => {
      test('when no param is present', async () => {
        const { waitForNextUpdate } = renderHook(() => useCharacter())

        await waitForNextUpdate()

        expect(global.fetch).toHaveBeenCalledWith(
          'https://rickandmortyapi.com/api/character',
          undefined
        )
      })

      test('when param is provided', async () => {
        const { waitForNextUpdate } = renderHook(() => useCharacter({name: 'morty', status: 'dead'}))

        await waitForNextUpdate()

        expect(global.fetch).toHaveBeenCalledWith(
          'https://rickandmortyapi.com/api/character/?name=morty&status=dead',
          undefined
        )
      })

      test('fallback when empty object', async () => {
        const { waitForNextUpdate } = renderHook(() => useCharacter({}))

        await waitForNextUpdate()

        expect(global.fetch).toHaveBeenCalledWith(
          'https://rickandmortyapi.com/api/character',
          undefined
        )
      })
    })
  })
})
