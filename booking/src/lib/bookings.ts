import api from '@/lib/api'

export async function getBookings() {
  try {
    const response = await api.get('/booking/v1')
    // console.log(response.data)
    return response.data
  } catch (error) {
    console.error('Erro na requisição:', error)
  }
}
