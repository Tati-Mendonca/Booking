import { BookingCard } from '@/components/booking-card'
import { calculateDays } from './utils/date'
import { Booking } from '@/lib/type'
import { getBookings } from '@/lib/bookings'
import Input from '@/components/input-date'
import Button from '@/components/button'

type Props = {
  searchParams?: Record<string, string | string[] | undefined>
}

export default async function Home({ searchParams }: Props) {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const currentMonth =
    typeof searchParams?.month === 'string' ? searchParams.month : `${year}-${month}`

  let bookings: Booking[] = []
  let hasError = false

  try {
    bookings = await getBookings(currentMonth)
  } catch (error) {
    console.error('Erro ao buscar reservas:', error)
    hasError = true
  }

  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center px-4 py-8 relative">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-semibold">Reservas</h1>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 md:mb-4">
          <p className="text-sm text-gray-500">Todas as reservas referentes ao mês atual:</p>
          <div className="flex flex-col text-xs sm:text-sm w-full sm:w-auto">
            <Input currentMonth={currentMonth} />
          </div>
        </div>

        {hasError ? (
          <p className="text-red-500 mt-6 text-sm">
            Desculpe, não foi possível carregar as reservas. Tente novamente mais tarde.
          </p>
        ) : bookings.length > 0 ? (
          <ul>
            {bookings.slice(0, 10).map((booking) => (
              <li key={booking.id} className="my-3">
                <BookingCard
                  id={booking.id}
                  input={booking.input}
                  output={booking.output}
                  price={booking.price}
                  customerName={booking.customerName}
                  days={calculateDays(booking.input, booking.output)}
                />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-2 text-gray-600 mt-6 italic">
            Não há registro de nenhuma reserva para este mês.
          </p>
        )}
      </div>
      <Button />
    </main>
  )
}
