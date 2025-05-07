import axios from 'axios'

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL

export async function getBookings() {
  try {
    const response = await axios.get(`${baseURL}/booking/v1`)
    return response.data
  } catch (error) {
    console.error('Erro ao buscar reservas:', error)
    return []
  }
}

export async function newBooking(data: any) {
  try {
    const response = await axios.post(`${baseURL}/booking/v1`, data)
    return response.data
  } catch (error) {
    console.error('Erro ao criar nova reserva:', error)
    return []
  }
}
