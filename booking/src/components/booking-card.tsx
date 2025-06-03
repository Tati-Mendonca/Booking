'use client'

import { Booking } from '@/lib/type'
import { calculateDays, formatDate } from '@/app/utils/date'
import { Pencil, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { deleteBooking } from '@/lib/bookings'

type BookingCardProps = {
  booking: Booking
  showActions?: boolean
  onDeleted?: () => void
}

export function BookingCard({ booking, showActions = true }: BookingCardProps) {
  const router = useRouter()
  const { id, input, output, price, customerName } = booking
  console.log(booking)

  async function handleDelete() {
    const confirmed = confirm('Tem certeza que deseja excluir esta reserva?')
    if (!confirmed) return

    try {
      await deleteBooking(id)
      alert('Reserva excluída com sucesso.')
      router.refresh()
    } catch (err) {
      console.log('Erro ao excluir reserva.')
    }
  }

  return (
    <div className="w-full bg-gray-200 rounded-lg p-4 pt-2 shadow-sm">
      <header className="flex justify-between">
        <span>{customerName}</span>
        {calculateDays(input, output)} {calculateDays(input, output) <= 1 ? 'dia' : 'dias'}
      </header>
      <hr className="mb-2" />
      <section className="flex justify-between items-center text-sm text-gray-700">
        <ul>
          <li>{formatDate(input)}</li>
          <li>{formatDate(output)}</li>
        </ul>
        <p className="text-black"> R$ {Number(price).toFixed(2).replace('.', ',')}</p>
        {showActions && (
          <div className="flex flex-col items-center justify-baseline">
            <Pencil
              className="size-[14px] text-sm cursor-pointer"
              onClick={() => router.push(`/booking/${id}`)}
            />
            <X className="size-5 text-sm mt-1 cursor-pointer" onClick={handleDelete} />
          </div>
        )}
      </section>
    </div>
  )
}
