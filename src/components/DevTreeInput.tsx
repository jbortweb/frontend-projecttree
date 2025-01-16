import { Project } from '../types'

type DevTreeInputProps = {
  item: Project
}

export default function DevTreeInput({ item }: DevTreeInputProps) {
  return (
    <div className="bg-white text-black px-5 py-2 items-center gap-5 rounded-lg flex mb-6">
      <img
        className="w-10"
        src={`/lenguajes/${item.name}.svg`}
        alt={item.name}
      />
      <p className=" py-2">{item.url}</p>
    </div>
  )
}
