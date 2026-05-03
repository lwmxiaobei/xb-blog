interface Props {
  message?: string
}

export default function EmptyState({ message = 'No pets found.' }: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="text-6xl mb-4 select-none">🐾</div>
      <p className="font-heading text-xl text-gray-600 mb-2">No companions here yet</p>
      <p className="text-cloudy text-sm">{message}</p>
    </div>
  )
}
