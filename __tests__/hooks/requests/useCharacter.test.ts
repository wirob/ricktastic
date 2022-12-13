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

  it('has correct data structure', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useCharacter())

    await waitForNextUpdate()

    expect(result.current).toHaveProperty('character')
    expect(result.current).toHaveProperty('isError')
    expect(result.current).toHaveProperty('isLoading')
  })

  it('calls on fetch only once', async () => {
    const { waitForNextUpdate } = renderHook(() => useCharacter())

    await waitForNextUpdate()

    expect(global.fetch).toHaveBeenCalledTimes(1)
  })
})
