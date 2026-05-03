'use client'

import { type Pet } from '@/data/seedPets'

interface Props {
  pet: Pet
  scale?: number
}

// CSS box-shadow pixel art definitions per pet type
// Each entry is an array of [x, y, color] for a 16x16 grid scaled up
const SPRITE_COLORS: Record<string, string[]> = {
  ghost: ['#8B9DC3', '#C9D4E8', '#E8EEF8'],
  fox: ['#E8833A', '#F4C878', '#8B4513'],
  mushroom: ['#D4A853', '#5C8A3C', '#8B7355'],
  lightning: ['#FFE066', '#FFA500', '#FFF9C4'],
  cloud: ['#E8E8F0', '#B8C0D0', '#FFFFFF'],
  water: ['#4FC3F7', '#81D4FA', '#0277BD'],
  stone: ['#90817A', '#B8A99A', '#5D4037'],
  cat: ['#E040FB', '#7C4DFF', '#CE93D8'],
  fire: ['#FF6F00', '#FFCA28', '#BF360C'],
  leaf: ['#66BB6A', '#A5D6A7', '#2E7D32'],
  dragon: ['#5C6BC0', '#9FA8DA', '#1A237E'],
  wisp: ['#80DEEA', '#4DD0E1', '#E0F7FA'],
  cactus: ['#4CAF50', '#8BC34A', '#795548'],
  bubble: ['#B3E5FC', '#E1F5FE', '#81D4FA'],
  wolf: ['#616161', '#9E9E9E', '#212121'],
  coral: ['#FF7043', '#FF8A65', '#FFCCBC'],
  storm: ['#607D8B', '#90A4AE', '#37474F'],
  crystal: ['#E91E63', '#9C27B0', '#CE93D8'],
  ladybug: ['#F44336', '#FFCDD2', '#212121'],
  bonsai: ['#795548', '#A1887F', '#33691E'],
}

// Tiny SVG creature per category
function GhostSVG({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 16 16" width="100%" height="100%" style={{ imageRendering: 'pixelated' }}>
      <rect x="3" y="5" width="10" height="8" fill={color} />
      <rect x="2" y="4" width="12" height="1" fill={color} />
      <rect x="1" y="3" width="14" height="2" fill={color} />
      <rect x="3" y="13" width="2" height="2" fill={color} />
      <rect x="7" y="13" width="2" height="2" fill={color} />
      <rect x="11" y="13" width="2" height="2" fill={color} />
      <rect x="5" y="7" width="2" height="2" fill="#fff" />
      <rect x="9" y="7" width="2" height="2" fill="#fff" />
      <rect x="6" y="8" width="1" height="1" fill="#333" />
      <rect x="10" y="8" width="1" height="1" fill="#333" />
    </svg>
  )
}

function FoxSVG({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 16 16" width="100%" height="100%" style={{ imageRendering: 'pixelated' }}>
      <rect x="1" y="2" width="3" height="4" fill={color} />
      <rect x="12" y="2" width="3" height="4" fill={color} />
      <rect x="3" y="4" width="10" height="8" fill={color} />
      <rect x="2" y="5" width="12" height="6" fill={color} />
      <rect x="5" y="7" width="2" height="2" fill="#fff" />
      <rect x="9" y="7" width="2" height="2" fill="#fff" />
      <rect x="6" y="8" width="1" height="1" fill="#333" />
      <rect x="10" y="8" width="1" height="1" fill="#333" />
      <rect x="6" y="11" width="4" height="1" fill="#E8833A" />
      <rect x="4" y="12" width="8" height="2" fill={color} />
    </svg>
  )
}

function CatSVG({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 16 16" width="100%" height="100%" style={{ imageRendering: 'pixelated' }}>
      <rect x="2" y="2" width="3" height="3" fill={color} />
      <rect x="11" y="2" width="3" height="3" fill={color} />
      <rect x="3" y="4" width="10" height="8" fill={color} />
      <rect x="2" y="5" width="12" height="6" fill={color} />
      <rect x="5" y="7" width="2" height="2" fill="#fff" />
      <rect x="9" y="7" width="2" height="2" fill="#fff" />
      <rect x="6" y="8" width="1" height="1" fill="#333" />
      <rect x="10" y="8" width="1" height="1" fill="#333" />
      <rect x="2" y="12" width="12" height="2" fill={color} />
    </svg>
  )
}

function DragonSVG({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 16 16" width="100%" height="100%" style={{ imageRendering: 'pixelated' }}>
      <rect x="1" y="1" width="4" height="3" fill={color} />
      <rect x="11" y="1" width="4" height="3" fill={color} />
      <rect x="3" y="3" width="10" height="9" fill={color} />
      <rect x="2" y="4" width="12" height="7" fill={color} />
      <rect x="5" y="6" width="2" height="2" fill="#FFD700" />
      <rect x="9" y="6" width="2" height="2" fill="#FFD700" />
      <rect x="4" y="10" width="8" height="2" fill={color} />
      <rect x="6" y="12" width="4" height="2" fill={color} />
    </svg>
  )
}

function PlantSVG({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 16 16" width="100%" height="100%" style={{ imageRendering: 'pixelated' }}>
      <rect x="6" y="1" width="4" height="6" fill={color} />
      <rect x="3" y="4" width="4" height="4" fill={color} />
      <rect x="9" y="4" width="4" height="4" fill={color} />
      <rect x="5" y="7" width="6" height="2" fill={color} />
      <rect x="6" y="9" width="4" height="5" fill="#795548" />
      <rect x="5" y="11" width="6" height="1" fill="#795548" />
    </svg>
  )
}

function ElementalSVG({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 16 16" width="100%" height="100%" style={{ imageRendering: 'pixelated' }}>
      <rect x="6" y="1" width="4" height="3" fill={color} />
      <rect x="4" y="3" width="8" height="4" fill={color} />
      <rect x="3" y="5" width="10" height="4" fill={color} />
      <rect x="4" y="9" width="8" height="3" fill={color} />
      <rect x="6" y="12" width="4" height="2" fill={color} />
      <rect x="6" y="6" width="2" height="2" fill="#fff" />
      <rect x="9" y="6" width="2" height="2" fill="#fff" />
    </svg>
  )
}

function BeastSVG({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 16 16" width="100%" height="100%" style={{ imageRendering: 'pixelated' }}>
      <rect x="1" y="3" width="3" height="2" fill={color} />
      <rect x="12" y="3" width="3" height="2" fill={color} />
      <rect x="3" y="4" width="10" height="8" fill={color} />
      <rect x="2" y="5" width="12" height="6" fill={color} />
      <rect x="5" y="7" width="2" height="2" fill="#fff" />
      <rect x="9" y="7" width="2" height="2" fill="#fff" />
      <rect x="6" y="8" width="1" height="1" fill="#333" />
      <rect x="10" y="8" width="1" height="1" fill="#333" />
      <rect x="5" y="11" width="6" height="1" fill="#333" />
    </svg>
  )
}

function DefaultSVG({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 16 16" width="100%" height="100%" style={{ imageRendering: 'pixelated' }}>
      <rect x="4" y="2" width="8" height="12" rx="2" fill={color} />
      <rect x="6" y="5" width="2" height="2" fill="#fff" />
      <rect x="9" y="5" width="2" height="2" fill="#fff" />
      <rect x="6" y="9" width="5" height="1" fill="#fff" />
    </svg>
  )
}

function getSVG(pet: Pet, color: string) {
  switch (pet.category) {
    case 'ghost':    return <GhostSVG color={color} />
    case 'beast':    return pet.name.toLowerCase().includes('fox') ? <FoxSVG color={color} /> : <BeastSVG color={color} />
    case 'plant':    return <PlantSVG color={color} />
    case 'elemental': return <ElementalSVG color={color} />
    case 'creature': return pet.name.toLowerCase().includes('cat') || pet.name.toLowerCase().includes('glitch') ? <CatSVG color={color} /> : <DefaultSVG color={color} />
    default:         return <DefaultSVG color={color} />
  }
}

function getAnimationClass(type: string): string {
  switch (type) {
    case 'idle':   return 'animate-float'
    case 'bounce': return 'animate-bounce'
    default:       return ''
  }
}

export default function PetSprite({ pet, scale = 2 }: Props) {
  const size = 32 * scale
  const spriteKey = pet.spriteFile.replace('.png', '')
  const colors = SPRITE_COLORS[spriteKey] ?? SPRITE_COLORS.ghost
  const primaryColor = colors[0]

  return (
    <div
      className={`inline-block ${getAnimationClass(pet.animationType)}`}
      style={{ width: size, height: size }}
    >
      {getSVG(pet, primaryColor)}
    </div>
  )
}
