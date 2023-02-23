export type UUID = string
export type GUID = string
export type CUID = string
export type ISO_DATE = string //YYYY-MM-DDTHH:mm:ss.sssZ
export type MIN_DATE = string //YYYY-MM-DD
export type NUM_DATE = string //Date.now()

export enum Env {
  DEFAULT = `default`,
  DEVELOP = `develop`,
  STAGING = `staging`,
  PRODUCTION = `production`,
}

export enum Role {
  ADMIN = 'admin',
  USER = 'user',
}
