interface Props {
  tag: string
}

const tagColors: Record<string, string> = {
  featured: 'bg-crail text-white',
  official: 'bg-gray-800 text-white',
  ghost: 'bg-blue-100 text-blue-700',
  cat: 'bg-purple-100 text-purple-700',
  dragon: 'bg-indigo-100 text-indigo-700',
  fox: 'bg-orange-100 text-orange-700',
  plant: 'bg-green-100 text-green-700',
}

export default function PetBadge({ tag }: Props) {
  const colorClass = tagColors[tag] ?? 'bg-pampas-dark text-cloudy'
  return (
    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium capitalize ${colorClass}`}>
      {tag}
    </span>
  )
}
