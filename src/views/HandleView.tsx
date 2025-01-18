import { Navigate, useParams } from 'react-router-dom'
import HandleData from '../components/HandleData'
import { getUserByHandle } from '../api/ArbolAPI'
import { useQuery } from '@tanstack/react-query'

export default function HandleView() {
  const params = useParams()
  const handle = params.handle!

  const { data, error, isLoading } = useQuery({
    queryFn: () => getUserByHandle(handle),
    queryKey: ['handle', handle],
    retry: 2,
  })

  if (isLoading) return <p className="text-white text-center">Cargando...</p>
  if (error) return <Navigate to="/404" />
  if (!data) return <Navigate to="/404" />

  return <HandleData user={data.user} projects={data.projects} />
}
