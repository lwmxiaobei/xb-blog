'use client'

import { useEffect, useState, type MouseEvent } from 'react'
import { hasFavoritedPet, toggleFavoriteDB } from '@/lib/petsApi'
import { getOrCreateDeviceId } from '@/lib/deviceId'

interface Props {
  petId: string
  size?: 'sm' | 'md'
  className?: string
}

export default function FavoriteButton({ petId, size = 'md', className = '' }: Props) {
  const [favorited, setFavorited] = useState(false)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    const deviceId = getOrCreateDeviceId()
    hasFavoritedPet(petId, deviceId).then((v) => {
      setFavorited(v)
      setHydrated(true)
    })
  }, [petId])

  async function handleClick(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    e.stopPropagation()
    const deviceId = getOrCreateDeviceId()
    const next = await toggleFavoriteDB(petId, deviceId)
    setFavorited(next)
  }

  if (!hydrated) return null

  const iconSize = size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4'
  const btnSize = size === 'sm' ? 'p-1' : 'p-1.5'

  return (
    <button
      onClick={handleClick}
      aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
      title={favorited ? 'Remove from favorites' : 'Add to favorites'}
      className={`${btnSize} rounded-full transition-colors ${
        favorited
          ? 'text-crail bg-crail/10 hover:bg-crail/20'
          : 'text-cloudy bg-white/80 hover:text-crail hover:bg-crail/10'
      } ${className}`}
    >
      <svg
        className={iconSize}
        fill={favorited ? 'currentColor' : 'none'}
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
        />
      </svg>
    </button>
  )
}
