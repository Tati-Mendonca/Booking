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
  input: Date
  output: Date
  price: number
  customerName: string
  customerId?: number
  days?: number | null
}
