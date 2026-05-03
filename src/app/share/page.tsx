'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { usePetsStore } from '@/store/pets'
import { CATEGORIES, type Category, type AnimationType } from '@/data/seedPets'
import BaseButton from '@/components/ui/BaseButton'
import BaseInput from '@/components/ui/BaseInput'
import BaseTextarea from '@/components/ui/BaseTextarea'
import BaseSelect from '@/components/ui/BaseSelect'

interface FormState {
  name: string
  description: string
  category: Category
  author: string
  importCode: string
  tags: string
}

interface Errors {
  name?: string
  description?: string
  author?: string
  importCode?: string
}

const categoryOptions = CATEGORIES.map((c) => ({ value: c, label: c.charAt(0).toUpperCase() + c.slice(1) }))
const animOptions: { value: AnimationType; label: string }[] = [
  { value: 'idle', label: 'Idle (float)' },
  { value: 'walk', label: 'Walk' },
  { value: 'bounce', label: 'Bounce' },
]

export default function SharePage() {
  const router = useRouter()
  const addPet = usePetsStore((s) => s.addPet)

  const [form, setForm] = useState<FormState>({
    name: '',
    description: '',
    category: 'creature',
    author: '',
    importCode: '',
    tags: '',
  })
  const [animationType, setAnimationType] = useState<AnimationType>('idle')
  const [errors, setErrors] = useState<Errors>({})
  const [submitted, setSubmitted] = useState(false)

  function validate(): boolean {
    const e: Errors = {}
    if (!form.name.trim()) e.name = 'Name is required'
    else if (form.name.length > 40) e.name = 'Max 40 characters'
    if (!form.description.trim()) e.description = 'Description is required'
    else if (form.description.length > 200) e.description = 'Max 200 characters'
    if (!form.author.trim()) e.author = 'Author name is required'
    if (!form.importCode.trim()) e.importCode = 'Import code is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return

    addPet({
      name: form.name.trim(),
      description: form.description.trim(),
      category: form.category,
      author: form.author.trim(),
      spriteFile: `${form.category}.png`,
      spriteWidth: 32,
      spriteHeight: 32,
      frameCount: 4,
      animationType,
      palette: [],
      tags: form.tags
        .split(',')
        .map((t) => t.trim().toLowerCase())
        .filter(Boolean),
      importCode: form.importCode.trim(),
    })

    setSubmitted(true)
    setTimeout(() => router.push('/browse'), 1500)
  }

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <div className="text-5xl mb-4">🎉</div>
        <h2 className="font-heading text-2xl font-semibold text-gray-800 mb-2">Pet submitted!</h2>
        <p className="text-cloudy">Redirecting to Browse…</p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="font-heading text-3xl font-bold text-gray-800 mb-2">Share a Companion</h1>
      <p className="text-cloudy mb-8">Add your pixel pet to the community catalog.</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <BaseInput
          id="name"
          label="Pet Name *"
          placeholder="e.g. Spectra"
          maxLength={40}
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          error={errors.name}
        />

        <BaseTextarea
          id="description"
          label="Description *"
          placeholder="Describe your companion in a sentence or two…"
          rows={3}
          maxLength={200}
          currentLength={form.description.length}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          error={errors.description}
        />

        <div className="grid grid-cols-2 gap-4">
          <BaseSelect
            id="category"
            label="Category *"
            options={categoryOptions}
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value as Category })}
          />
          <BaseSelect
            id="animationType"
            label="Animation *"
            options={animOptions}
            value={animationType}
            onChange={(e) => setAnimationType(e.target.value as AnimationType)}
          />
        </div>

        <BaseInput
          id="author"
          label="Author Name *"
          placeholder="Your username or handle"
          value={form.author}
          onChange={(e) => setForm({ ...form, author: e.target.value })}
          error={errors.author}
        />

        <BaseInput
          id="importCode"
          label="Import Code *"
          placeholder="e.g. my-pet-slug-v1"
          value={form.importCode}
          onChange={(e) => setForm({ ...form, importCode: e.target.value })}
          error={errors.importCode}
        />

        <BaseInput
          id="tags"
          label="Tags (optional)"
          placeholder="ghost, cute, featured — comma separated"
          value={form.tags}
          onChange={(e) => setForm({ ...form, tags: e.target.value })}
        />

        <div className="flex gap-3 pt-2">
          <BaseButton type="submit" variant="primary" className="px-8">
            Submit Pet
          </BaseButton>
          <BaseButton type="button" variant="ghost" onClick={() => router.back()}>
            Cancel
          </BaseButton>
        </div>
      </form>
    </div>
  )
}
