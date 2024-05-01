export interface User {
  id: string
  name: string
  email: string
  password: string
  roles: string[]
  img?: string
}

export class User {
  constructor({ id, name, email, password, roles, img }: User) {
    this.id = id
    this.name = name
    this.email = email
    this.password = password
    this.roles = roles
    this.img = img
  }
}