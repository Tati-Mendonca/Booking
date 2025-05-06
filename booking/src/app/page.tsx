import { BookingCard } from '@/components/booking-card'
import Button from '@/components/button'
import { getBookings } from '@/lib/bookings'
import { Booking } from '@/lib/type'

export default async function Home() {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const currentMonth = `${year}-${month}`

  const bookings: Booking[] = await getBookings()

  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center px-4 py-8 relative">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-semibold">Reservas</h1>
        {/* <p className="text-sm text-gray-700">Visualize todas as reservas para o mês de {mesAtual}:</p> */}

        <div className="flex items-center gap-2 mb-6">
          <p className="text-sm text-gray-500 mr-13">Todas as reservas referentes ao mês atual:</p>
          <div className="relative inline-block">
            <input
              type="month"
              defaultValue={currentMonth}
              //   value={selectedDate}
              //   onChange={e => setSelectedDate(e.target.value)}
              className=" px-2 py-1 w-[130px] text-sm border rounded"
            />
          </div>
        </div>
        <ul>
          {bookings.slice(0, 10).map((booking) => (
            <li key={booking.id} className="mb-3">
              <BookingCard
                input={booking.input}
                output={booking.output}
                price={booking.price}
                customerName={booking.customerName}
                days={booking.days}
              />
            </li>
          ))}
        </ul>
      </div>
      <Button />
    </main>
  )
}
