export type Booking = {
  id: number
  input: Date
  output: Date
  price: number
  customerName: string
  days: number
}

export type Customer = {
  id: number
  name: string
  cpf: string
  phone: string
}
