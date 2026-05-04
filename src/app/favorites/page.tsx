'use client'

import { useEffect, useState } from 'react'
import { useFavoritesStore } from '@/store/favorites'
import { usePetsStore } from '@/store/pets'
import { type Pet } from '@/data/seedPets'
import PetGrid from '@/components/pets/PetGrid'
import Link from 'next/link'

export default function FavoritesPage() {
  const favorites = useFavoritesStore((s) => s.favorites)
  const getPetById = usePetsStore((s) => s.getPetById)
  const [hydrated, setHydrated] = useState(false)
  const [favoritedPets, setFavoritedPets] = useState<Pet[]>([])

  useEffect(() => {
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    const pets = favorites
      .map((id) => getPetById(id))
      .filter((p): p is Pet => p !== undefined)
    setFavoritedPets(pets)
  }, [hydrated, favorites, getPetById])

  if (!hydrated) {
    return (
      <div className="flex items-center justify-center py-32">
        <p className="text-cloudy">Loading…</p>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold text-gray-800 mb-2">My Favorites</h1>
        <p className="text-cloudy text-sm">
          {favoritedPets.length === 0
            ? 'No favorites yet — browse pets and save the ones you love!'
            : `${favoritedPets.length} saved companion${favoritedPets.length !== 1 ? 's' : ''}`}
        </p>
      </div>

      {favoritedPets.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-6">
          <div className="w-16 h-16 rounded-full bg-pampas flex items-center justify-center">
            <svg className="w-8 h-8 text-cloudy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </div>
          <div className="text-center">
            <p className="text-gray-600 font-medium mb-1">No favorites yet</p>
            <p className="text-cloudy text-sm">Start exploring and save pets you like</p>
          </div>
          <Link
            href="/browse"
            className="px-6 py-2.5 bg-crail hover:bg-crail-dark text-white text-sm font-medium rounded-full transition-colors"
          >
            Browse Pets
          </Link>
        </div>
      ) : (
        <PetGrid pets={favoritedPets} />
      )}
    </div>
  )
}
