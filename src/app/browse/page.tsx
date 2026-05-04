'use client'

import { useState, useMemo, useEffect } from 'react'
import { usePetsStore } from '@/store/pets'
import PetGrid from '@/components/pets/PetGrid'
import SearchBar from '@/components/ui/SearchBar'
import FilterChips from '@/components/ui/FilterChips'
import BaseSelect from '@/components/ui/BaseSelect'

const sortOptions = [
  { value: 'newest', label: 'Newest' },
  { value: 'liked', label: 'Most Liked' },
  { value: 'az', label: 'Name A–Z' },
]

export default function BrowsePage() {
  const pets = usePetsStore((s) => s.pets)
  const loading = usePetsStore((s) => s.loading)
  const loadPets = usePetsStore((s) => s.loadPets)
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')
  const [sortBy, setSortBy] = useState('newest')

  useEffect(() => { loadPets() }, [loadPets])

  const filtered = useMemo(() => {
    let result = [...pets]

    if (category !== 'all') {
      result = result.filter((p) => p.category === category)
    }

    if (query.trim()) {
      const q = query.toLowerCase()
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      )
    }

    if (sortBy === 'liked') result.sort((a, b) => b.likes - a.likes)
    else if (sortBy === 'az') result.sort((a, b) => a.name.localeCompare(b.name))
    else result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    return result
  }, [pets, query, category, sortBy])

  if (loading && pets.length === 0) {
    return (
      <div className="flex items-center justify-center py-32">
        <p className="text-cloudy">Loading companions…</p>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="font-heading text-3xl font-bold text-gray-800 mb-6">All Companions</h1>

      <div className="flex gap-3 mb-4 flex-col sm:flex-row">
        <SearchBar value={query} onChange={setQuery} placeholder="Search by name, tag..." />
        <BaseSelect
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          options={sortOptions}
          className="sm:w-40"
        />
      </div>

      <FilterChips selected={category} onChange={setCategory} />

      <p className="text-cloudy text-sm mt-4 mb-4">
        {filtered.length} companion{filtered.length !== 1 ? 's' : ''} found
      </p>

      <PetGrid
        pets={filtered}
        emptyMessage="Try a different search or category."
      />
    </div>
  )
}
