export interface ILoginParams {
  userName: string
  passWord: string | number
  code: string
}
export interface IRegisterParams {
  username: string
  password: string | number
  realname: string
  sex?: number
  email?: string
}
export interface ILogoutParams {
  username: string
  enable: number
}

export interface ILoginApi {
  login: (params: ILoginParams) => Promise<any>
  register: (params: IRegisterParams) => Promise<any>
  logout: (params: ILogoutParams) => Promise<any>
}
