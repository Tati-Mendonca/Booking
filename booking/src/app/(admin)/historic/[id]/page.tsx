'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { getHistoric } from '@/lib/bookings'
import { Booking } from '@/lib/type'
import Header from '@/components/header'
import { BookingCard } from '@/components/booking-card'

export default function HistoricPage() {
  const params = useParams()
  const id = Number(params.id)

  const [data, setData] = useState<Booking[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!id) return
    const fetchData = async () => {
      setLoading(true)
      try {
        const result = await getHistoric(id)
        setData(result)
      } catch (err) {
        setError('Erro ao carregar histórico.')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [id])

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white flex flex-col items-center pt-28 px-4 pb-8">
        <h1 className="text-2xl font-semibold mb-4">Histórico</h1>
        {loading && <p>Carregando...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {data?.length ? (
          <ul className="w-[31.25em] max-w-xl space-y-4">
            {data.map((booking) => (
              <li key={booking.id}>
                <BookingCard booking={booking} showActions={false} />
              </li>
            ))}
          </ul>
        ) : (
          !loading && <p>Nenhuma reserva encontrada para este cliente.</p>
        )}
      </main>
    </>
  )
}
