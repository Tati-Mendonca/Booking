import Header from '@/components/header'
import Table from '@/components/table'

export default function Page() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white flex flex-col items-center  pt-28 px-4 pb-8 relative">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold py-2">Cadastro de Clientes</h1>
          <div className="mb-4">
            <p className="text-sm text-gray-500">
              Informação de todos os clientes que já alugaram o apartamento:
            </p>
          </div>
          <Table />
        </div>
      </main>
    </>
  )
}
