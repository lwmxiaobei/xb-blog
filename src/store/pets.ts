'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { type Pet, seedPets } from '@/data/seedPets'

interface PetsState {
  pets: Pet[]
  addPet: (data: Omit<Pet, 'id' | 'createdAt' | 'featured' | 'views' | 'likes'>) => Pet
  likePet: (id: string) => void
  getPetById: (id: string) => Pet | undefined
}

export const usePetsStore = create<PetsState>()(
  persist(
    (set, get) => ({
      pets: seedPets,

      getPetById: (id) => get().pets.find((p) => p.id === id),

      addPet: (data) => {
        const newPet: Pet = {
          ...data,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
          featured: false,
          views: 0,
          likes: 0,
        }
        set((state) => ({ pets: [...state.pets, newPet] }))
        return newPet
      },

      likePet: (id) => {
        set((state) => ({
          pets: state.pets.map((p) => (p.id === id ? { ...p, likes: p.likes + 1 } : p)),
        }))
      },
    }),
    {
      name: 'codex-pets',
    }
  )
)
