'use client'
import { deleteCustomer, getCustomers } from '@/lib/customer'
import { Customer } from '@/lib/type'
import { useEffect, useState } from 'react'
import { ChevronRight, ChevronLeft, Pencil, X } from 'lucide-react'

const ITEMS = 10

export default function Table() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const data = await getCustomers()
        setCustomers(data)
      } catch (err) {
        setError('Erro ao buscar clientes')
      } finally {
        setIsLoading(false)
      }
    }

    fetchCustomers()
  }, [])

  const sortedCustomers = [...customers].reverse()
  const totalPages = Math.ceil(customers.length / ITEMS)
  const startIndex = (currentPage - 1) * ITEMS
  const endIndex = startIndex + ITEMS
  const currentCustomers = sortedCustomers.slice(startIndex, endIndex)

  const handleEdit = async (id: string) => {}

  async function handleDelete(id: number) {
    if (!confirm('Tem certeza que deseja este cliente?')) return
    try {
      await deleteCustomer(id)
      setCustomers((prev) => prev.filter((customer) => customer.id !== id))
    } catch (err) {
      alert('Não é possivel excluir cliente com reserva cadastrada em sistema!')
    }
  }

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1))
  }

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  }

  if (isLoading) return <p>Carregando clientes...</p>
  if (error) return <p className="text-red-500">{error}</p>

  return (
    <>
      <table className="min-w-full divide-y divide-gray-700 shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
              ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
              Nome
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
              Documento
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
              Telefone
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
              Ação
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {currentCustomers.map((customer) => (
            <tr key={customer.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.id}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {customer.cpf || 'Não cadastrado'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {customer.phone || 'Não cadastrado'}
              </td>
              <td className="p-2 whitespace-nowrap text-sm text-gray-500">
                <div className="flex flex-col items-center gap-1">
                  <Pencil
                    className="size-3.5 cursor-pointer"
                    // onClick={() => handleEdit(customer.id)}
                  />
                  <X className="size-5 cursor-pointer" onClick={() => handleDelete(customer.id)} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center items-center gap-4 mt-4">
        <ChevronLeft
          onClick={handlePrevPage}
          className={`h-8 w-8 p-1 rounded-md transition 
    ${
      currentPage === 1
        ? 'text-gray-400 cursor-not-allowed'
        : 'text-blue-700 hover:text-blue-900 cursor-pointer'
    }`}
        />

        <span className="text-sm">
          {currentPage} de {totalPages}
        </span>
        <ChevronRight
          onClick={handleNextPage}
          className={`h-8 w-8 p-1 rounded-md transition 
    ${
      currentPage === totalPages
        ? 'text-gray-400 cursor-not-allowed'
        : 'text-blue-700 hover:text-blue-900 cursor-pointer'
    }`}
        />
      </div>
    </>
  )
}
