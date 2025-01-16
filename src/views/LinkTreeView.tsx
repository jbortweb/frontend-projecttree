import { useState, useEffect } from 'react'
import { social } from '../data/social'
import { Project } from '../types'
import { v4 as uuid } from 'uuid'
import {
  handleProject,
  getUserProjects,
  updateProject,
  deleteProject,
} from '../api/ArbolAPI'
import { toast } from 'sonner'

const LinkTreeView = () => {
  const [projects, setProjects] = useState<Project[]>([]) // Lista de proyectos locales
  const [savedStatus, setSavedStatus] = useState<{ [key: string]: boolean }>({}) // Estado para el guardado de cada proyecto individualmente

  // Llamada a la API para obtener los proyectos del usuario al renderizar el componente
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const userProjects = await getUserProjects()
        setProjects(userProjects)

        // Marcar los proyectos como guardados
        const initialSavedStatus = userProjects.reduce((acc, project) => {
          acc[project._id] = true // Asumimos que estos proyectos ya están guardados
          return acc
        }, {} as { [key: string]: boolean })

        setSavedStatus(initialSavedStatus)
      } catch (error) {
        console.error('Error al obtener los proyectos:', error)
      }
    }

    fetchProjects()
  }, [])

  // Manejar la selección de un nuevo lenguaje
  const handleSocial = (name: string) => {
    const newProject = { _id: uuid(), name, url: '' }
    setProjects([...projects, newProject])
    setSavedStatus((prevStatus) => ({
      ...prevStatus,
      [newProject._id]: false, // Este proyecto es nuevo, así que aún no está guardado
    }))
  }

  // Manejar cambios en el input de URL
  const handleUrlChange = (id: string, url: string) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project._id === id ? { ...project, url } : project
      )
    )
  }

  // Guardar un proyecto
  const handleSave = async (id: string) => {
    const projectToSave = projects.find((project) => project._id === id)
    if (projectToSave && projectToSave.url) {
      const savedProject = await handleProject(projectToSave)

      if (savedProject) {
        // Actualizamos el estado con el nuevo _id y marcamos como guardado
        setProjects((prevProjects) =>
          prevProjects.map((project) =>
            project._id === id ? { ...project, _id: savedProject._id } : project
          )
        )

        setSavedStatus((prevStatus) => ({
          ...prevStatus,
          [savedProject._id]: true, // Cambia el estado del botón para el nuevo _id
          [id]: false, // Aseguramos que el antiguo id ya no está activo
        }))
      } else {
        toast.error('La URL es requerida')
      }
    } else {
      toast.error('La URL es requerida')
    }
  }

  // Función para manejar el editar
  const handleEdit = async (_id: string) => {
    const projectToUpdate = projects.find((project) => project._id === _id)
    if (projectToUpdate && projectToUpdate.url) {
      const updatedProject = await updateProject(_id, {
        name: projectToUpdate.name,
        url: projectToUpdate.url,
      })

      if (updatedProject) {
        setProjects((prevProjects) =>
          prevProjects.map((project) =>
            project._id === _id ? updatedProject : project
          )
        )
      }
    } else {
      console.error('El proyecto no tiene una URL válida para actualizar')
    }
  }

  // Función para manejar el eliminar
  const handleDelete = async (_id: string) => {
    const deleted = await deleteProject(_id)
    if (deleted) {
      setProjects((prevProjects) =>
        prevProjects.filter((project) => project._id !== _id)
      )
      setSavedStatus((prevStatus) => {
        const { [_id]: removed, ...rest } = prevStatus
        return rest
      })
    }
  }

  return (
    <div>
      <div className="mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {social.map((item) => (
          <button
            key={item.name}
            style={{ backgroundColor: item.color }}
            className="w-full h-12 text-white font-bold rounded flex items-center justify-center"
            onClick={() => handleSocial(item.name)}
          >
            {item.name}
          </button>
        ))}
      </div>

      {projects.length > 0 && (
        <div className="w-full space-y-5">
          {projects.map((item) => (
            <div key={item._id} className="p-4 border rounded shadow">
              <div className="flex gap-4 items-center">
                <img
                  src={`/lenguajes/${item.name}.svg`}
                  alt={item.name}
                  className="w-12 h-12"
                />
                <input
                  type="url"
                  value={item.url}
                  onChange={(e) => handleUrlChange(item._id, e.target.value)} // Actualizamos el estado de la URL
                  placeholder={`URL para ${item.name}`}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              {savedStatus[item._id] ? (
                <div className="mt-4 flex justify-center gap-4">
                  <button
                    onClick={() => handleEdit(item._id)}
                    className="p-2 bg-yellow-500 text-white font-bold rounded w-32"
                  >
                    Actualizar
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="p-2 bg-red-500 text-white font-bold rounded w-32"
                  >
                    Eliminar
                  </button>
                </div>
              ) : (
                <div className="flex justify-center mt-4">
                  <button
                    onClick={() => handleSave(item._id)} // Guardar solo este proyecto
                    className="p-2 w-32 bg-blue-500 text-white font-bold rounded"
                  >
                    Guardar
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default LinkTreeView
