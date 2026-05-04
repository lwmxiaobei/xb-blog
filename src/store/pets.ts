'use client'

import { create } from 'zustand'
import { type Pet, seedPets } from '@/data/seedPets'
import { fetchAllPets, insertPet, seedPetsIfEmpty } from '@/lib/petsApi'

interface PetsState {
  pets: Pet[]
  loading: boolean
  initialized: boolean
  loadPets: () => Promise<void>
  addPet: (data: Omit<Pet, 'id' | 'createdAt' | 'featured' | 'views' | 'likes'>) => Promise<Pet>
  getPetById: (id: string) => Pet | undefined
}

export const usePetsStore = create<PetsState>()((set, get) => ({
  pets: [],
  loading: false,
  initialized: false,

  getPetById: (id) => get().pets.find((p) => p.id === id),

  loadPets: async () => {
    if (get().initialized) return
    set({ loading: true })
    try {
      await seedPetsIfEmpty(seedPets)
      const pets = await fetchAllPets()
      set({ pets, initialized: true })
    } finally {
      set({ loading: false })
    }
  },

  addPet: async (data) => {
    const newPet: Pet = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      featured: false,
      views: 0,
      likes: 0,
    }
    const saved = await insertPet(newPet)
    set((state) => ({ pets: [saved, ...state.pets] }))
    return saved
  },


}))
