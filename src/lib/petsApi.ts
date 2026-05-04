import { supabase } from './supabase'
import type { Pet } from '@/data/seedPets'

type DbPet = {
  id: string
  name: string
  description: string
  category: string
  author: string
  sprite_file: string
  sprite_width: number
  sprite_height: number
  frame_count: number
  animation_type: string
  palette: string[]
  tags: string[]
  import_code: string
  featured: boolean
  views: number
  likes: number
  created_at: string
}

function fromDb(row: DbPet): Pet {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    category: row.category as Pet['category'],
    author: row.author,
    spriteFile: row.sprite_file,
    spriteWidth: row.sprite_width,
    spriteHeight: row.sprite_height,
    frameCount: row.frame_count,
    animationType: row.animation_type as Pet['animationType'],
    palette: row.palette,
    tags: row.tags,
    importCode: row.import_code,
    featured: row.featured,
    views: row.views,
    likes: row.likes,
    createdAt: row.created_at,
  }
}

function toDb(pet: Pet): DbPet {
  return {
    id: pet.id,
    name: pet.name,
    description: pet.description,
    category: pet.category,
    author: pet.author,
    sprite_file: pet.spriteFile,
    sprite_width: pet.spriteWidth,
    sprite_height: pet.spriteHeight,
    frame_count: pet.frameCount,
    animation_type: pet.animationType,
    palette: pet.palette,
    tags: pet.tags,
    import_code: pet.importCode,
    featured: pet.featured,
    views: pet.views,
    likes: pet.likes,
    created_at: pet.createdAt,
  }
}

export async function fetchAllPets(): Promise<Pet[]> {
  const { data, error } = await supabase
    .from('pets')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return (data as DbPet[]).map(fromDb)
}

export async function fetchPetById(id: string): Promise<Pet | null> {
  const { data, error } = await supabase
    .from('pets')
    .select('*')
    .eq('id', id)
    .single()
  if (error) return null
  return fromDb(data as DbPet)
}

export async function insertPet(pet: Pet): Promise<Pet> {
  const { data, error } = await supabase
    .from('pets')
    .insert(toDb(pet))
    .select()
    .single()
  if (error) throw error
  return fromDb(data as DbPet)
}

export async function incrementLikes(id: string): Promise<void> {
  const { error } = await supabase.rpc('increment_pet_likes', { pet_id: id })
  if (error) {
    const { data } = await supabase.from('pets').select('likes').eq('id', id).single()
    if (data) {
      await supabase.from('pets').update({ likes: data.likes + 1 }).eq('id', id)
    }
  }
}

export async function hasLikedPet(petId: string, deviceId: string): Promise<boolean> {
  const { data } = await supabase
    .from('pet_likes')
    .select('id')
    .eq('pet_id', petId)
    .eq('device_id', deviceId)
    .maybeSingle()
  return data !== null
}

export async function likePetWithDevice(petId: string, deviceId: string): Promise<boolean> {
  const { data, error } = await supabase.rpc('like_pet', {
    p_pet_id: petId,
    p_device_id: deviceId,
  })
  if (error) return false
  return data as boolean
}

export async function incrementViews(id: string): Promise<void> {
  const { data } = await supabase.from('pets').select('views').eq('id', id).single()
  if (data) {
    await supabase.from('pets').update({ views: data.views + 1 }).eq('id', id)
  }
}

export async function seedPetsIfEmpty(seeds: Pet[]): Promise<void> {
  const { count } = await supabase
    .from('pets')
    .select('id', { count: 'exact', head: true })
  if (count === 0) {
    const rows = seeds.map(toDb)
    const { error } = await supabase.from('pets').insert(rows)
    if (error) throw error
  }
}
