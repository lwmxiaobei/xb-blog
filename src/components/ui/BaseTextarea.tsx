import { TextareaHTMLAttributes } from 'react'

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  maxLength?: number
  currentLength?: number
}

export default function BaseTextarea({
  label,
  error,
  maxLength,
  currentLength,
  className = '',
  id,
  ...props
}: Props) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <textarea
        id={id}
        maxLength={maxLength}
        className={`w-full px-3 py-2 rounded border border-cloudy-light bg-white text-sm text-gray-800 placeholder-cloudy focus:outline-none focus:border-crail focus:ring-1 focus:ring-crail transition-colors resize-none ${className}`}
        {...props}
      />
      <div className="flex justify-between items-center">
        {error ? <p className="text-red-500 text-xs">{error}</p> : <span />}
        {maxLength && (
          <p className="text-cloudy text-xs">
            {currentLength ?? 0}/{maxLength}
          </p>
        )}
      </div>
    </div>
  )
}
