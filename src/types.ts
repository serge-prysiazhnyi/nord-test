export interface ServerData {
  name: string
  distance: number
}

export interface APITokenResponse {
  token: string
}

export interface UserCredentials {
  username: string
  password: string
}

export enum DIRECTIONS {
  asc = 'ASC',
  desc = 'DESC',
}
