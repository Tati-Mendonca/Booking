'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { getBookingById, updateBooking } from '@/lib/bookings'
import BookingForm from '@/components/booking-form'
import Link from 'next/link'
import { X } from 'lucide-react'
import { BookingFormData } from '@/lib/type'

export default function EditPage() {
  const router = useRouter()
  const params = useParams()
  const id = Number(params.id)
  const [initialData, setInitialData] = useState<any | null>(null)

  useEffect(() => {
    getBookingById(Number(id)).then(setInitialData).catch(console.error)
  }, [id])

  const handleUpdate = async (formData: BookingFormData, customerId: number) => {
    await updateBooking(Number(id), {
      ...formData,
      id: Number(id),
      customerId,
    })
    router.push('/')
  }

  if (!initialData) return <div>Carregando...</div>

  return (
    <div className="min-h-screen backdrop flex items-center justify-center px-4 py-8">
      <div className="w-[500px] bg-gray-200 rounded-lg p-4 pt-2 shadow-sm space-y-4">
        <header className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Editar Reserva</h2>
          <Link href="/">
            <X className="size-8 mr-[-6px]" />
          </Link>
        </header>
        <hr className="mb-4" />
        <BookingForm initialData={initialData} onSubmit={handleUpdate} />
      </div>
    </div>
  )
}
