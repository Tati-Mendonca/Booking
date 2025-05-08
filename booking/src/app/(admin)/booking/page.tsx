import BookingForm from '@/components/booking-form'
import { X } from 'lucide-react'
import Link from 'next/link'

export default function Page() {
  return (
    <div className="min-h-screen backdrop flex items-center justify-center px-4 py-8">
      <div className="w-[500px] bg-gray-200 rounded-lg p-4 pt-2 shadow-sm space-y-4">
        <header className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold"> Nova Reserva</h2>
          <Link href="/">
            <X className="size-8 mr-[-6px]" />
          </Link>
        </header>
        <hr className="mb-4" />
        <BookingForm />
        <div className="flex justify-end">
          {/* <button className=" bg-gray-500 text-white p-2 px-6 rounded shadow-md mt-4  hover:bg-gray-600 transition">
            Salvar
          </button> */}
        </div>
      </div>
    </div>
  )
}
