'use client'

import { deleteBooking } from '@/lib/bookings'
import { formatDate } from '@/app/utils/date'
import { Pencil, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { Booking } from '@/lib/type'

type BookingCardProps = {
  booking: Booking
}

export function BookingCard({ booking }: BookingCardProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const { id, input, output, price, customerName, days } = booking

  async function handleDelete(id: number) {
    if (!confirm('Tem certeza que deseja excluir esta reserva?')) return
    try {
      await deleteBooking(id)
      startTransition(() => {
        router.refresh()
      })
    } catch (err) {
      alert('Erro ao excluir reserva')
    }
  }
  return (
    <div className="w-full bg-gray-200 rounded-lg p-4 pt-2 shadow-sm">
      <header className="flex justify-between">
        <span>{customerName}</span>
        <span className="text-sm">
          {days} {days <= 1 ? 'dia' : 'dias'}
        </span>
      </header>
      <hr className="mb-2" />
      <section className="flex justify-between items-center text-sm text-gray-700">
        <ul>
          <li>{formatDate(input)}</li>
          <li>{formatDate(output)}</li>
        </ul>
        <p className="text-black"> R$ {Number(price).toFixed(2).replace('.', ',')}</p>
        <div className="flex flex-col items-center justify-baseline">
          <Pencil
            className="size-[14px] text-sm cursor-pointer"
            onClick={() => router.push(`/booking/${id}`)}
          />
          <X className="size-5 text-sm mt-1 cursor-pointer" onClick={() => handleDelete(id)} />
        </div>
      </section>
    </div>
  )
}
