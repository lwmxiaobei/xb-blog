'use client'

import { type Category, CATEGORIES } from '@/data/seedPets'

interface Props {
  selected: string
  onChange: (category: string) => void
}

export default function FilterChips({ selected, onChange }: Props) {
  const all = ['all', ...CATEGORIES]
  return (
    <div className="flex gap-2 flex-wrap">
      {all.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`px-3 py-1 rounded-full text-xs font-medium capitalize transition-colors ${
            selected === cat
              ? 'bg-crail text-white'
              : 'bg-pampas-dark text-cloudy hover:bg-cloudy-light'
          }`}
        >
          {cat === 'all' ? 'All' : cat}
        </button>
      ))}
    </div>
  )
}
