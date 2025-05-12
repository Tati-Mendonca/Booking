'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { searchCustomerByName, createCustomer } from '@/lib/customer'
import { BookingFormData } from '@/lib/type'

type BookingFormProps = {
  initialData?: BookingFormData
  onSubmit?: (formData: BookingFormData, customerId: number) => void
}

const BookingForm = ({ initialData, onSubmit }: BookingFormProps) => {
  const [formData, setFormData] = useState<BookingFormData>({
    id: initialData?.id || undefined,
    input: initialData?.input || '',
    output: initialData?.output || '',
    price: Number(initialData?.price) || '',
    customerName: initialData?.customerName || '',
  })

  const router = useRouter()

  useEffect(() => {
    if (initialData) {
      setFormData({
        id: initialData.id,
        input: initialData.input,
        output: initialData.output,
        price: initialData.price,
        customerName: initialData.customerName,
      })
    }
  }, [initialData])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const inputDate = new Date(formData.input)
    const outputDate = new Date(formData.output)

    if (outputDate <= inputDate) {
      alert('A data de saída deve ser posterior à data de entrada.')
      return
    }
    try {
      const existingCustomers = await searchCustomerByName(formData.customerName)

      let customerId
      console.log(customerId)

      if (existingCustomers.length > 0) {
        customerId = existingCustomers[0].id
      } else {
        const newCustomer = await createCustomer({ name: formData.customerName })
        customerId = newCustomer.id
      }

      if (onSubmit) {
        await onSubmit(formData, customerId)
      } else {
        const res = await fetch('/api/booking', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            input: formData.input,
            output: formData.output,
            price: formData.price,
            customerId,
          }),
        })

        if (!res.ok) throw new Error('Erro ao criar reserva')
        router.push('/')
      }
    } catch (err) {
      console.error('Erro ao enviar o formulário:', err)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="booking-form">
      <div className="flex justify-between items-baseline">
        <label>
          Name:
          <input
            type="search"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            placeholder="Digite o nome"
            required
            className="bg-white w-65 m-2 px-2 rounded"
            disabled={!!initialData?.id}
          />
        </label>

        <label>
          Preço:
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="w-20 bg-white px-2 ml-2 rounded"
          />
        </label>
      </div>

      <div className="flex justify-between items-baseline">
        <label>
          Entrada:
          <input
            type="date"
            name="input"
            value={String(formData.input)}
            onChange={handleChange}
            required
            className="px-2 m-2 bg-white rounded"
          />
        </label>

        <label>
          Saída:
          <input
            type="date"
            name="output"
            value={String(formData.output)}
            onChange={handleChange}
            required
            className="bg-white px-2 ml-2 rounded"
          />
        </label>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-gray-500 text-white p-2 px-6 rounded shadow-md mt-4  hover:bg-gray-600 transition"
        >
          Salvar
        </button>
      </div>
    </form>
  )
}

export default BookingForm
