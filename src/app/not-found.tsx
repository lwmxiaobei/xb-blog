import Link from 'next/link'
import BaseButton from '@/components/ui/BaseButton'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="text-8xl mb-6 select-none">🐾</div>
      <h1 className="font-heading text-4xl font-bold text-gray-800 mb-3">404</h1>
      <p className="text-gray-500 mb-2 text-lg">This companion has wandered off.</p>
      <p className="text-cloudy text-sm mb-8">The page you are looking for does not exist.</p>
      <Link href="/">
        <BaseButton variant="primary">Return Home</BaseButton>
      </Link>
    </div>
  )
}
