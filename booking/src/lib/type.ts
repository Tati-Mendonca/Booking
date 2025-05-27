export type Booking = {
  id: number
  input: Date
  output: Date
  price: number
  customerName: string
  days: number
}

export type BookingFormData = {
  id?: number
  input: Date | string
  output: Date | string
  price: number | string
  customerName: string
  customerId?: number
  days?: number | null
}

export type Customer = {
  id: number
  name: string
  cpf: string
  phone: string
}
