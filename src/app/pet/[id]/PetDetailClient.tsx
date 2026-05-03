'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { usePetsStore } from '@/store/pets'
import { type Pet } from '@/data/seedPets'
import PetSprite from '@/components/pets/PetSprite'
import PetBadge from '@/components/pets/PetBadge'
import BaseButton from '@/components/ui/BaseButton'
import Link from 'next/link'

interface Props {
  id: string
}

export default function PetDetailClient({ id }: Props) {
  const router = useRouter()
  const getPetById = usePetsStore((s) => s.getPetById)
  const likePet = usePetsStore((s) => s.likePet)

  const [pet, setPet] = useState<Pet | undefined>(undefined)
  const [liked, setLiked] = useState(false)
  const [copied, setCopied] = useState(false)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setHydrated(true)
    const found = getPetById(id)
    if (!found) router.push('/browse')
    else setPet(found)
  }, [id, getPetById, router])

  if (!hydrated || !pet) {
    return (
      <div className="flex items-center justify-center py-32">
        <p className="text-cloudy">Loading…</p>
      </div>
    )
  }

  function handleLike() {
    if (liked || !pet) return
    likePet(pet.id)
    setLiked(true)
    setPet((prev) => prev ? { ...prev, likes: prev.likes + 1 } : prev)
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(pet!.importCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard not available
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Link href="/browse" className="text-sm text-crail hover:text-crail-dark flex items-center gap-1 mb-8">
        ← Back to Browse
      </Link>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Sprite panel */}
        <div className="flex-shrink-0 flex flex-col items-center gap-4">
          <div className="bg-pampas rounded-xl p-10 shadow-card flex items-center justify-center">
            <PetSprite pet={pet} scale={6} />
          </div>
          <span className="text-xs text-cloudy capitalize bg-pampas-dark px-3 py-1 rounded-full">
            {pet.category}
          </span>
        </div>

        {/* Info panel */}
        <div className="flex-1 flex flex-col gap-5">
          <div>
            <h1 className="font-heading text-4xl font-bold text-gray-800">{pet.name}</h1>
            <p className="text-cloudy text-sm mt-1">
              by <span className="font-medium text-gray-600">{pet.author}</span>
              {' · '}
              {new Date(pet.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </p>
          </div>

          <p className="text-gray-600 leading-relaxed">{pet.description}</p>

          <div className="flex gap-2 flex-wrap">
            {pet.tags.map((tag) => (
              <PetBadge key={tag} tag={tag} />
            ))}
          </div>

          {/* Like */}
          <button
            onClick={handleLike}
            disabled={liked}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded border transition-colors w-fit text-sm font-medium ${
              liked
                ? 'bg-red-50 border-red-200 text-red-500 cursor-default'
                : 'border-cloudy-light text-cloudy hover:border-crail hover:text-crail'
            }`}
          >
            <svg
              className="w-4 h-4"
              fill={liked ? 'currentColor' : 'none'}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            {liked ? 'Liked!' : `Like · ${pet.likes}`}
          </button>

          {/* Import code */}
          <div className="bg-pampas rounded-lg p-4 border border-pampas-dark">
            <p className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wider">Import Code</p>
            <div className="flex items-center gap-3">
              <code className="flex-1 font-mono text-sm text-gray-800 break-all">{pet.importCode}</code>
              <BaseButton variant="ghost" onClick={handleCopy} className="flex-shrink-0 text-xs py-1 px-3">
                {copied ? '✓ Copied' : 'Copy'}
              </BaseButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
