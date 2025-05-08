'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { searchCustomerByName, createCustomer } from '@/lib/customer'

const BookingForm = () => {
  const [formData, setFormData] = useState({
    input: '',
    output: '',
    price: '',
    customerName: '',
  })

  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const existingCustomers = await searchCustomerByName(formData.customerName)

      let customerId

      if (existingCustomers.length > 0) {
        customerId = existingCustomers[0].id
      } else {
        const newCustomer = await createCustomer({ name: formData.customerName })
        customerId = newCustomer.id
      }

      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          input: formData.input,
          output: formData.output,
          price: formData.price,
          customerId: customerId,
        }),
      })

      if (res.ok) {
        router.push('/')
      } else {
        console.error('Erro ao criar reserva')
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
            className="w-65 px-2 m-2 bg-white rounded"
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
            value={formData.input}
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
            value={formData.output}
            onChange={handleChange}
            required
            className="bg-white px-2 ml-2 rounded"
          />
        </label>
      </div>

      <div className="flex justify-end">
        <button className=" bg-gray-500 text-white p-2 px-6 rounded shadow-md mt-4  hover:bg-gray-600 transition">
          Salvar
        </button>
      </div>
    </form>
  )
}

export default BookingForm
