import { UserHandle, Project } from '../types'

type HandleDataProps = {
  user: UserHandle
  projects: Project[]
}

export default function HandleData({ user, projects }: HandleDataProps) {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-10 space-y-5">
        <img
          src={user.image}
          alt={`Imagen de ${user.name}`}
          className="w-auto max-w-[250px] rounded-3xl m-auto"
        />
        <h1 className="text-3xl font-bold text-white">{user.name}</h1>
        <p className="text-lg text-gray-300">{user.description}</p>
      </div>

      <div className="text-center">
        {projects.length > 0 ? (
          <ul className="space-y-4">
            {projects.map((project) => (
              <li
                key={project._id}
                className="p-4 bg-gray-800 rounded-lg border border-white"
              >
                <h3 className="text-2xl font-bold text-lime-500 capitalize">
                  {project.name}
                </h3>
                <div className=" px-5 py-2 items-center gap-5 rounded-lg flex mb-6">
                  <img
                    className="w-10"
                    src={`/lenguajes/${project.name}.svg`}
                    alt={project.name}
                  />
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400"
                  >
                    {project.url}
                  </a>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">Este usuario no tiene proyectos.</p>
        )}
      </div>
    </div>
  )
}
