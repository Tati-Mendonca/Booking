const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL

export async function getBookings() {
  const res = await fetch(`${baseURL}/booking/v1`)
  if (!res.ok) throw new Error('Erro ao buscar reserva')
  return res.json()
}

export async function newBooking(data: any) {
  const res = await fetch(`${baseURL}/booking/v1`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Erro ao criar reserva')
  return res.json()
}
export async function getBookingById(id: number) {
  const res = await fetch(`${baseURL}/booking/v1/${id}`)
  if (!res.ok) throw new Error('Erro ao buscar reserva')
  return res.json()
}

export async function updateBooking(id: number, data: any) {
  const res = await fetch(`${baseURL}/booking/v1/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!res.ok) throw new Error('Não foi possivel editar reserva')
  return res.json()
}

export async function deleteBooking(id: number) {
  const res = await fetch(`${baseURL}/booking/v1/${id}`, {
    method: 'DELETE',
  })
  if (!res.ok) throw new Error('Não foi possivel excluir reserva')
  return true
}
