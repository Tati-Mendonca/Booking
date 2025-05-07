import { NextResponse } from 'next/server'
import { newBooking } from '@/lib/bookings'

export async function POST(request: Request) {
  const data = await request.json()

  try {
    const booking = await newBooking(data)
    return NextResponse.json(booking, { status: 201 })
  } catch (error) {
    return NextResponse.json({ message: 'Erro ao criar reserva' }, { status: 500 })
  }
}
