import { setToken, getToken, removeToken } from './storage'

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
    setToken('my-test-token')
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'auth_token',
      'my-test-token',
    )
  })

  test('should retrieve the token from localStorage', () => {
    vi.spyOn(localStorage, 'getItem').mockReturnValue('my-test-token')
    expect(getToken()).toBe('my-test-token')
    expect(localStorage.getItem).toHaveBeenCalledWith('auth_token')
  })

  test('should remove the token from localStorage', () => {
    removeToken()
    expect(localStorage.removeItem).toHaveBeenCalledWith('auth_token')
  })
})
