import { Link } from 'react-router-dom'

export default function HomeNavigation() {
  return (
    <>
      <div className="flex gap-6">
        <Link
          to="/auth/login"
          className="text-white font-black text-xs pt-2 cursor-pointer"
        >
          Iniciar Sesión
        </Link>
        <Link
          className=" bg-lime-500 p-2 text-slate-800 uppercase font-black text-xs rounded-lg cursor-pointer"
          to="/auth/register"
        >
          Registrate
        </Link>
      </div>
    </>
  )
}
