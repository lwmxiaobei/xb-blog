import { type Pet } from '@/data/seedPets'
import PetCard from './PetCard'
import EmptyState from '@/components/ui/EmptyState'

interface Props {
  pets: Pet[]
  emptyMessage?: string
}

export default function PetGrid({ pets, emptyMessage }: Props) {
  if (pets.length === 0) {
    return <EmptyState message={emptyMessage} />
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {pets.map((pet) => (
        <PetCard key={pet.id} pet={pet} />
      ))}
    </div>
  )
}
