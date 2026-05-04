'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface LikesState {
  liked: string[]
  isLiked: (id: string) => boolean
  addLike: (id: string) => void
}

export const useLikesStore = create<LikesState>()(
  persist(
    (set, get) => ({
      liked: [],

      isLiked: (id) => get().liked.includes(id),

      addLike: (id) => {
        if (!get().liked.includes(id)) {
          set((state) => ({ liked: [...state.liked, id] }))
        }
      },
    }),
    {
      name: 'codex-likes',
    }
  )
)
