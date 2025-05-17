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
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 my-2">
        <label className="flex flex-col text-xs sm:text-sm w-full sm:w-auto">
          Nome:
          <input
            type="search"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            placeholder="Digite o nome"
            required
            className="bg-white w-full sm:w-64 px-2 py-2 sm:py-1 rounded text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
            disabled={!!initialData?.id}
          />
        </label>

        <label className="flex flex-col text-xs sm:text-sm w-full sm:w-auto">
          Preço:
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="bg-white border border-gray-300 shadow-sm focus:shadow-md w-full sm:w-24 px-2 py-2 sm:py-1 rounded text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
          />
        </label>
      </div>

      <div className="flex flex-col sm:flex-row justify-between">
        <label className="flex flex-col text-xs sm:text-sm w-full sm:w-auto">
          Entrada:
          <input
            type="date"
            name="input"
            value={String(formData.input)}
            onChange={handleChange}
            required
            className="bg-white border border-gray-300 shadow-sm focus:shadow-md w-44 px-2 py-2 sm:py-1 rounded text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
          />
        </label>

        <label className="flex flex-col text-xs sm:text-sm w-full sm:w-auto">
          Saída:
          <input
            type="date"
            name="output"
            value={String(formData.output)}
            onChange={handleChange}
            required
            className="bg-white border border-gray-300 shadow-sm focus:shadow-md w-44 px-2 py-2 sm:py-1 rounded text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
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
