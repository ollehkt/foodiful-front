export interface User {
  email: string
  name: string
  phone: string
  token: string
  role: string
  id: number
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
