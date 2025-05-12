'use client'

import { deleteBooking } from '@/lib/bookings'
import { formatDate } from '@/app/utils/date'
import { Pencil, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'

type BookingProps = {
  id: number
  input: Date
  output: Date
  price: number
  customerName: string
  days: number
}

export function BookingCard({ id, input, output, price, customerName, days }: BookingProps) {
  console.log('BookingCard props:', { id, input, output, price, customerName, days })
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  async function handleDelete() {
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
    <>
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
            <button
              className="text-sm cursor-pointer"
              onClick={() => router.push(`/booking/${id}`)}
            >
              <Pencil className="size-[14px]" />
            </button>
            <button
              className="text-sm mt-1 cursor-pointer"
              onClick={handleDelete}
              disabled={isPending}
            >
              <X className="size-5" />
            </button>
          </div>
        </section>
      </div>
    </>
  )
}
