import { BookingCard } from '@/components/booking-card'
import Button from '@/components/button'
// import { Calendar } from "lucide-react";

export default function Home() {
  const mesAtual = 'Maio'

  // const bookings = [
  //   { input: '2025-05-10', output: '2025-05-12', price: '500.00', customerName: 'Tatiane' },
  //   { input: '2025-05-15', output: '2025-05-17', price: '750.00', customerName: 'João' }
  // ]

  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center px-4 py-8 relative">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-semibold">Reservas</h1>
        {/* <p className="text-sm text-gray-700">Visualize todas as reservas para o mês de {mesAtual}:</p> */}

        <div className="flex items-center gap-2 mb-6">
          <p className="text-sm text-gray-500 mr-15">
            Todas as reservas referentes ao mês de {mesAtual}:
          </p>
          <div className="relative inline-block">
            <input
              type="date"
              //   value={selectedDate}
              //   onChange={e => setSelectedDate(e.target.value)}
              className="pl-8 pr-2 py-1 w-[130px] text-sm border rounded"
            />
          </div>
        </div>
        <BookingCard
          customerName={"João 'amigo da Fia'"}
          input={'04-05-2025'}
          output={'04-05-2025'}
          price={'200,00'}
          days={0}
        />
      </div>
      <Button />
    </main>
  )
}
