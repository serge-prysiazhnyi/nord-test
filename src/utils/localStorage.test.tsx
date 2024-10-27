import {
  setTokenInLocalStorage,
  getTokenFromLocalStorage,
  removeTokenFromLocalStorage,
} from './localStorage'
import { mockToken } from '../mocks/mockTestsData'
import { LOCAL_STORAGE_TOKEN_KEY } from '../constants'

describe('Token Storage', () => {
  beforeEach(() => {
    vi.spyOn(Storage.prototype, 'setItem')
    vi.spyOn(Storage.prototype, 'getItem')
    vi.spyOn(Storage.prototype, 'removeItem')
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  test('should store the token in localStorage', () => {
    setTokenInLocalStorage(mockToken)
    expect(localStorage.setItem).toHaveBeenCalledWith(
      LOCAL_STORAGE_TOKEN_KEY,
      mockToken,
    )
  })

  test('should retrieve the token from localStorage', () => {
    vi.spyOn(localStorage, 'getItem').mockReturnValue(mockToken)
    expect(getTokenFromLocalStorage()).toBe(mockToken)
    expect(localStorage.getItem).toHaveBeenCalledWith(LOCAL_STORAGE_TOKEN_KEY)
  })

  test('should remove the token from localStorage', () => {
    removeTokenFromLocalStorage()
    expect(localStorage.removeItem).toHaveBeenCalledWith(
      LOCAL_STORAGE_TOKEN_KEY,
    )
  })
})
