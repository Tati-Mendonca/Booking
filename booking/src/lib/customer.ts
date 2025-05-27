import { Customer } from './type'

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL

export async function searchCustomerByName(name: string) {
  const res = await fetch(`${baseURL}/customer/v1/search?name=${encodeURIComponent(name)}`)
  if (!res.ok) throw new Error('Erro ao buscar cliente')
  return res.json()
}

export async function createCustomer(data: { name: string }) {
  const res = await fetch(`${baseURL}/customer/v1`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Erro ao criar cliente')
  return res.json()
}

export async function getCustomers(): Promise<Customer[]> {
  const res = await fetch(`${baseURL}/customer/v1`, {
    method: 'GET',
    next: { revalidate: 0 },
  })
  if (!res.ok) throw new Error('Erro ao buscar clientes')
  return res.json()
}

export async function updateBooking(id: number, data: any) {
  const res = await fetch(`${baseURL}/customer/v1/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!res.ok) throw new Error('Não foi possivel editar cliente')
  return res.json()
}

export async function deleteCustomer(id: number) {
  const res = await fetch(`${baseURL}/customer/v1/${id}`, {
    method: 'DELETE',
  })
  console.log('Bateu no endpoint' + res)
  if (!res.ok) throw new Error('Não foi possivel excluir cliente')
  return true
}
