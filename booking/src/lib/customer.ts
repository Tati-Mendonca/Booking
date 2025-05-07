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
