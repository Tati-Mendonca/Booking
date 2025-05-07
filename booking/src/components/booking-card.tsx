import { formatDate } from '@/app/utils/date'
import { UserRoundPen } from 'lucide-react'
import { FilePenLine } from 'lucide-react'
import { Pencil } from 'lucide-react'
import { X } from 'lucide-react'

type BookingProps = {
  input: Date
  output: Date
  price: number
  customerName: string
  days: number
}

export function BookingCard({ input, output, price, customerName, days }: BookingProps) {
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
            <button className="text-sm">
              <Pencil className="size-[14px]" />
            </button>
            <button className="text-sm mt-1">
              <X className="size-5" />
            </button>
          </div>
        </section>
      </div>
    </>
  )
}
