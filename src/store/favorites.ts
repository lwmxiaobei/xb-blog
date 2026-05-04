'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface FavoritesState {
  favorites: string[]
  addFavorite: (id: string) => void
  removeFavorite: (id: string) => void
  isFavorite: (id: string) => boolean
  toggleFavorite: (id: string) => void
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],

      addFavorite: (id) => {
        set((state) => ({ favorites: [...state.favorites, id] }))
      },

      removeFavorite: (id) => {
        set((state) => ({ favorites: state.favorites.filter((f) => f !== id) }))
      },

      isFavorite: (id) => get().favorites.includes(id),

      toggleFavorite: (id) => {
        if (get().isFavorite(id)) {
          get().removeFavorite(id)
        } else {
          get().addFavorite(id)
        }
      },
    }),
    {
      name: 'codex-favorites',
    }
  )
)
