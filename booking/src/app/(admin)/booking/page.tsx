import BookingForm from '@/components/booking-form'
import { X } from 'lucide-react'
import Link from 'next/link'

export default function NewBooking() {
  return (
    <div className="backdrop h-screen flex items-center justify-center">
      <div className="bg-gray-200 rounded-lg px-4 py-8">
        <header className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold"> Nova Reserva</h2>
          <Link href="/">
            <X />
          </Link>
        </header>
        <hr className="mb-4" />
        <BookingForm />
        <div className="flex justify-end"></div>
      </div>
    </div>
  )
}
