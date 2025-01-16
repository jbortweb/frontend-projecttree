export type User = {
  handle: string
  name: string
  email: string
  _id: string
  description: string
  image: string
}
export type UserHandle = Pick<
  User,
  'handle' | 'description' | 'image' | 'name' | '_id'
>
export type RegisterForm = Pick<User, 'handle' | 'name' | 'email'> & {
  password: string
  password_confirmation: string
}
export type LoginForm = Pick<User, 'email'> & { password: string }
export type ProfileForm = Pick<User, 'handle' | 'description'>

export type Project = {
  _id: string
  name: string
  url: string
}

export type SocialProject = Pick<Project, 'name' | '_id'>
export type HandleProject = Pick<Project, 'name' | '_id' | 'url'> & {
  user: string
}

export type UserWithProjects = {
  user: UserHandle
  projects: Project[]
}
