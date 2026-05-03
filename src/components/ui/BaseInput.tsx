import { InputHTMLAttributes } from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export default function BaseInput({ label, error, className = '', id, ...props }: Props) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        id={id}
        className={`w-full px-3 py-2 rounded border border-cloudy-light bg-white text-sm text-gray-800 placeholder-cloudy focus:outline-none focus:border-crail focus:ring-1 focus:ring-crail transition-colors ${className}`}
        {...props}
      />
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  )
}
