import { isAxiosError } from 'axios'
import api from '../config/axios'
import { ProfileForm, Project, User, UserWithProjects } from '../types'
import { toast } from 'sonner'

export async function getUser() {
  try {
    const { data } = await api.get<User>('/user')
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
  return
}
export async function updateProfile(formData: ProfileForm) {
  try {
    const { data } = await api.patch<string>('/user', formData)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
  return
}
export async function uploadImage(file: File) {
  let formData = new FormData()
  formData.append('file', file)
  try {
    const {
      data: { image },
    }: { data: { image: string } } = await api.post('/user/image', formData)
    return image
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
  return
}

export async function handleProject(formData: Project) {
  try {
    const { data } = await api.post(`/project`, formData)
    toast.success('Proyecto guardado correctamente')
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      const errorMessage =
        error.response.data.error || 'Error al guardar el proyecto'
      toast.error(errorMessage)
    } else {
      toast.error('Error al guardar el proyecto')
    }
    return null
  }
}

export async function getUserProjects(): Promise<Project[]> {
  try {
    const { data } = await api.get<Project[]>('/projects')
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    } else {
      throw new Error('Error al obtener los proyectos')
    }
  }
}

export async function updateProject(
  projectId: string,
  formData: Partial<Project>
) {
  try {
    const { data } = await api.patch(`/project/${projectId}`, formData)
    toast.success('Proyecto actualizado correctamente')
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      const errorMessage =
        error.response.data.error || 'Error al actualizar el proyecto'
      toast.error(errorMessage)
    } else {
      toast.error('Error al actualizar el proyecto')
    }
    return null
  }
}
export async function deleteProject(projectId: string) {
  try {
    const { data } = await api.delete(`/project/${projectId}`)
    toast.success('Proyecto eliminado correctamente')
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      const errorMessage =
        error.response.data.error || 'Error al eliminar el proyecto'
      toast.error(errorMessage)
    } else {
      toast.error('Error al eliminar el proyecto')
    }
    return null
  }
}

export async function getUserByHandle(
  handle: string
): Promise<UserWithProjects> {
  try {
    const { data } = await api.get<UserWithProjects>(`/${handle}`)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
  throw new Error('Error desconocido al obtener datos del usuario')
}

export async function searchByHandle(handle: string) {
  try {
    const { data } = await api.post('/search', { handle })
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}
