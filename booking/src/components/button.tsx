'use client'
import { useRouter } from 'next/navigation'

export default function Button() {
  const router = useRouter()

  return (
    <div>
      <button
        onClick={() => router.push('/booking')}
        className="fixed bottom-8 right-8 bg-gray-500 text-white px-4 py-2 rounded shadow-md hover:bg-gray-600 transition"
      >
        Reservar
      </button>
    </div>
  )
}
