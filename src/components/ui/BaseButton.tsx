import { ButtonHTMLAttributes } from 'react'

type Variant = 'primary' | 'ghost' | 'secondary'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-crail text-white hover:bg-crail-dark shadow-btn',
  ghost:
    'border border-crail text-crail hover:bg-crail hover:text-white',
  secondary:
    'bg-pampas-dark text-gray-700 hover:bg-cloudy-light',
}

export default function BaseButton({ variant = 'primary', className = '', children, ...props }: Props) {
  return (
    <button
      className={`inline-flex items-center gap-2 px-4 py-2 rounded text-sm font-medium transition-colors duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
