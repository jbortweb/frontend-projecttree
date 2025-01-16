import { useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import NavigationTabs from './NavigationTabs'
import { Toaster } from 'sonner'
import { User, Project } from '../types'
import DevTreeInput from './DevTreeInput'
import { getUserProjects } from '../api/ArbolAPI' // Ajusta la ruta según corresponda
import Header from './Header'

type ArbolProyectProps = {
  data: User
}

export default function ArbolProyect({ data }: ArbolProyectProps) {
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    async function fetchProjects() {
      try {
        const fetchedProjects = await getUserProjects()
        setProjects(fetchedProjects)
      } catch (error) {
        console.error('Error al obtener los proyectos:', error)
      }
    }

    fetchProjects()
  }, [projects])

  return (
    <>
      <Header />
      <div className="bg-gray-100 min-h-screen py-10">
        <main className="mx-auto max-w-5xl p-10 md:p-0">
          <NavigationTabs />
          <div className="flex justify-end">
            <Link
              className="font-bold text-right text-slate-800 text-2xl"
              to={`/${data.handle}`}
              target="_blank"
              rel="noreferrer noopener"
            >
              Visitar Mi Perfil: /{data.handle}
            </Link>
          </div>

          <div className="flex flex-col md:flex-row gap-10 mt-10">
            <div className="flex-1 ">
              <Outlet />
            </div>
            <div className="w-full md:w-96 bg-slate-800 px-5 py-10 space-y-6">
              <p className="text-4xl text-center text-white">{data.handle}</p>
              {data.image && (
                <img
                  src={data.image}
                  alt={`Imagen de perfil de ${data.name}`}
                  className="w-auto max-w-[250px] rounded-3xl m-auto"
                />
              )}
              <p className="text-center text-lg text-white font-black">
                {data.description}
              </p>
              <div className="w-full">
                {projects.map((project) => (
                  <div className="space-y-5" key={project._id}>
                    <DevTreeInput item={project} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
      <Toaster position="top-right" />
    </>
  )
}
