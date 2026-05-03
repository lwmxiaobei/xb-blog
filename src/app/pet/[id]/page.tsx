import { seedPets } from '@/data/seedPets'
import PetDetailClient from './PetDetailClient'

export function generateStaticParams() {
  return seedPets.map((p) => ({ id: p.id }))
}

export default function PetDetailPage({ params }: { params: { id: string } }) {
  return <PetDetailClient id={params.id} />
}
