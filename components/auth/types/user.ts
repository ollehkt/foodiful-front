export interface User {
  id: number
  email: string
  name: string
  phone: string
  token: string
  role: string
}

export interface SignInType {
  email: string
  password: string
}

export interface SignUpType extends SignInType {
  phone: string
  name: string
  verify: string
}

export interface PromiseUserType {
  user: User
}

export interface ModifyUserType {
  [key: string]: string
  email: string
  name: string
  phone: string
  verify: string
  password: string
  changePassword: string
  confirmChangePassword: string
}
