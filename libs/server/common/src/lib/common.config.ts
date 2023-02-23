import { Env } from './common.enum'

//APP
export interface IConfigApp {
  service: string
  version: string
  endpoint: string
  whitelist: string[]
}

export interface IConfigRedis {
  host?: string
  port?: string
  pass?: string
}

export interface IConfig {
  env: Env
  app: IConfigApp
  redis: IConfigRedis
}
