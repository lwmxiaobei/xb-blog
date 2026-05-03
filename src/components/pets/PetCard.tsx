import Link from 'next/link'
import { type Pet } from '@/data/seedPets'
import PetSprite from './PetSprite'
import PetBadge from './PetBadge'

interface Props {
  pet: Pet
}

export default function PetCard({ pet }: Props) {
  return (
    <Link href={`/pet/${pet.id}`}>
      <article className="bg-white rounded-lg shadow-card hover:shadow-card-hover transition-shadow cursor-pointer h-full flex flex-col overflow-hidden">
        <div className="bg-pampas flex items-center justify-center h-28 overflow-hidden">
          <PetSprite pet={pet} scale={3} />
        </div>
        <div className="p-4 flex flex-col flex-1 gap-2">
          <h3 className="font-heading text-base font-semibold text-gray-800 leading-tight">{pet.name}</h3>
          <p className="text-cloudy text-xs leading-relaxed line-clamp-2 flex-1">{pet.description}</p>
          <div className="flex gap-1 flex-wrap">
            {pet.tags.slice(0, 3).map((tag) => (
              <PetBadge key={tag} tag={tag} />
            ))}
          </div>
          <div className="flex justify-between items-center text-xs text-cloudy pt-1 border-t border-pampas-dark">
            <span>by {pet.author}</span>
            <span className="flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
              </svg>
              {pet.likes}
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}
