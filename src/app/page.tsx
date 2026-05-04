import Link from 'next/link'
import { seedPets } from '@/data/seedPets'
import { fetchAllPets } from '@/lib/petsApi'
import PetGrid from '@/components/pets/PetGrid'
import PetSprite from '@/components/pets/PetSprite'
import BaseButton from '@/components/ui/BaseButton'

export const revalidate = 60

export default async function HomePage() {
  let allPets = seedPets
  try {
    const fetched = await fetchAllPets()
    if (fetched.length > 0) allPets = fetched
  } catch {
    // fallback to seedPets if Supabase is unavailable
  }

  const featuredPets = allPets.filter((p) => p.featured)
  const marqueeItems = [...allPets.slice(0, 20), ...allPets.slice(0, 20)]

  return (
    <div>
      {/* Hero */}
      <section className="bg-white border-b border-pampas-dark overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-16 flex flex-col items-center text-center gap-6">
          <div className="inline-flex items-center gap-2 bg-pampas px-3 py-1 rounded-full text-xs font-medium text-crail border border-crail/20">
            <span>✦</span> The pixel companion catalog
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight max-w-2xl">
            Discover your <span className="text-crail">pixel</span> companion
          </h1>
          <p className="text-gray-500 text-lg max-w-xl leading-relaxed">
            Browse, share, and import animated companions for your coding environment.
            Built by developers, for developers.
          </p>
          <div className="flex gap-3 flex-wrap justify-center">
            <Link href="/browse">
              <BaseButton variant="primary" className="px-6 py-3 text-base">
                Browse Gallery
              </BaseButton>
            </Link>
            <Link href="/share">
              <BaseButton variant="ghost" className="px-6 py-3 text-base">
                Share Your Pet
              </BaseButton>
            </Link>
          </div>
        </div>

        {/* Marquee strip */}
        <div className="border-t border-pampas-dark overflow-hidden bg-pampas py-4">
          <div className="flex animate-marquee marquee-track w-max gap-8 px-4">
            {marqueeItems.map((pet, i) => (
              <div key={`${pet.id}-${i}`} className="flex flex-col items-center gap-1 opacity-70 hover:opacity-100 transition-opacity">
                <PetSprite pet={pet} scale={2} />
                <span className="text-xs text-cloudy whitespace-nowrap">{pet.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured pets */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-heading text-2xl font-semibold text-gray-800">Featured Companions</h2>
          <Link href="/browse" className="text-sm text-crail hover:text-crail-dark font-medium">
            View all →
          </Link>
        </div>
        <PetGrid pets={featuredPets} />
      </section>

      {/* Stats banner */}
      <section className="bg-white border-y border-pampas-dark">
        <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-3 gap-6 text-center">
          <div>
            <p className="font-heading text-3xl font-bold text-crail">{allPets.length}+</p>
            <p className="text-sm text-cloudy mt-1">Companions</p>
          </div>
          <div>
            <p className="font-heading text-3xl font-bold text-crail">5</p>
            <p className="text-sm text-cloudy mt-1">Categories</p>
          </div>
          <div>
            <p className="font-heading text-3xl font-bold text-crail">∞</p>
            <p className="text-sm text-cloudy mt-1">Adventures</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="font-heading text-3xl font-semibold text-gray-800 mb-4">
          Have a companion to share?
        </h2>
        <p className="text-gray-500 mb-6 max-w-md mx-auto">
          Add your pixel pet to the catalog and let the community find their next coding companion.
        </p>
        <Link href="/share">
          <BaseButton variant="primary" className="px-8 py-3 text-base">
            Share a Pet →
          </BaseButton>
        </Link>
      </section>
    </div>
  )
}
