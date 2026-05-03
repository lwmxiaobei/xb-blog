'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { usePetsStore } from '@/store/pets'
import { type Pet } from '@/data/seedPets'
import PetSprite from '@/components/pets/PetSprite'
import PetBadge from '@/components/pets/PetBadge'
import Link from 'next/link'

interface Props {
  id: string
}

type InstallTab = 'CLI' | 'curl'

export default function PetDetailClient({ id }: Props) {
  const router = useRouter()
  const getPetById = usePetsStore((s) => s.getPetById)
  const likePet = usePetsStore((s) => s.likePet)

  const [pet, setPet] = useState<Pet | undefined>(undefined)
  const [liked, setLiked] = useState(false)
  const [copiedCmd, setCopiedCmd] = useState(false)
  const [hydrated, setHydrated] = useState(false)
  const [installTab, setInstallTab] = useState<InstallTab>('CLI')

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

  const cliCommand = `npx codex-pets add ${pet.importCode}`
  const curlCommand = `curl -fsSL https://codex-pets.dev/install/${pet.importCode} | sh`
  const installCommand = installTab === 'CLI' ? cliCommand : curlCommand

  function handleLike() {
    if (liked || !pet) return
    likePet(pet.id)
    setLiked(true)
    setPet((prev) => prev ? { ...prev, likes: prev.likes + 1 } : prev)
  }

  async function handleCopyCmd() {
    try {
      await navigator.clipboard.writeText(installCommand)
      setCopiedCmd(true)
      setTimeout(() => setCopiedCmd(false), 2000)
    } catch {
      // clipboard not available
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <Link href="/browse" className="text-sm text-crail hover:text-crail-dark flex items-center gap-1 mb-8">
        ← Back to Browse
      </Link>

      {/* Sprite + title */}
      <div className="flex flex-col sm:flex-row gap-6 mb-8">
        <div className="flex-shrink-0 flex flex-col items-center gap-3">
          <div className="bg-pampas rounded-xl p-8 shadow-card flex items-center justify-center">
            <PetSprite pet={pet} scale={5} />
          </div>
          <span className="text-xs text-cloudy capitalize bg-pampas-dark px-3 py-1 rounded-full">
            {pet.category}
          </span>
        </div>

        <div className="flex flex-col gap-3 justify-center">
          <h1 className="font-heading text-3xl font-bold text-gray-800">{pet.name}</h1>
          <p className="text-cloudy text-sm">
            by <span className="font-medium text-gray-600">{pet.author}</span>
            {' · '}
            {new Date(pet.createdAt).toLocaleDateString('en-US', {
              year: 'numeric', month: 'short', day: 'numeric',
            })}
          </p>
          <p className="text-gray-600 text-sm leading-relaxed">{pet.description}</p>
          <div className="flex gap-2 flex-wrap">
            {pet.tags.map((tag) => (
              <PetBadge key={tag} tag={tag} />
            ))}
          </div>
        </div>
      </div>

      {/* Download section */}
      <div className="flex flex-col gap-6">
        {/* Download package */}
        <div>
          <p className="text-sm text-gray-600 mb-3">
            Download the package, then unzip it into{' '}
            <code className="font-mono text-xs bg-pampas-dark px-1.5 py-0.5 rounded text-gray-700">
              $HOME/.codex/pets/{pet.importCode}
            </code>
            .
          </p>
          <button className="w-full flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 px-4 rounded-lg transition-colors text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10" />
            </svg>
            Download package
          </button>
        </div>

        {/* OR divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-pampas-dark" />
          <span className="text-xs text-cloudy font-medium">OR</span>
          <div className="flex-1 h-px bg-pampas-dark" />
        </div>

        {/* CLI install */}
        <div>
          <p className="text-sm text-gray-600 mb-3">
            Alternatively, copy and paste this command into your terminal.
          </p>

          {/* Tab switcher */}
          <div className="bg-pampas rounded-lg border border-pampas-dark overflow-hidden">
            <div className="flex border-b border-pampas-dark">
              {(['CLI', 'curl'] as InstallTab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setInstallTab(tab)}
                  className={`px-4 py-2 text-xs font-mono font-medium transition-colors ${
                    installTab === tab
                      ? 'text-gray-800 border-b-2 border-gray-800 -mb-px'
                      : 'text-cloudy hover:text-gray-600'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Command display */}
            <div className="bg-gray-900 px-4 py-3 flex items-center gap-3">
              <span className="text-green-400 font-mono text-sm select-none">$</span>
              <code className="flex-1 font-mono text-sm text-gray-100 break-all">{installCommand}</code>
            </div>

            {/* Copy button */}
            <button
              onClick={handleCopyCmd}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-pampas-dark transition-colors border-t border-pampas-dark"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              {copiedCmd ? '✓ Copied!' : 'Copy'}
            </button>
          </div>
        </div>

        {/* Manifest metadata */}
        <div className="rounded-lg border border-pampas-dark overflow-hidden divide-y divide-pampas-dark">
          {[
            { label: 'MANIFEST', value: pet.importCode },
            { label: 'PET.JSON', value: '181 B' },
            { label: 'SPRITESHEET', value: '1.1 MB' },
          ].map(({ label, value }) => (
            <div key={label} className="flex flex-col px-4 py-3 bg-white">
              <span className="text-xs text-cloudy font-medium tracking-wider uppercase mb-1">{label}</span>
              <span className="font-mono text-sm text-gray-800">{value}</span>
            </div>
          ))}
        </div>

        {/* Like */}
        <button
          onClick={handleLike}
          disabled={liked}
          className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg border text-sm font-medium transition-colors ${
            liked
              ? 'bg-red-50 border-red-200 text-red-500 cursor-default'
              : 'border-pampas-dark bg-white text-gray-600 hover:border-crail hover:text-crail'
          }`}
        >
          <svg
            className="w-4 h-4"
            fill={liked ? 'currentColor' : 'none'}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          {liked ? 'Liked!' : `Like · ${pet.likes}`}
        </button>
      </div>
    </div>
  )
}
