import Header from '@/components/header'

export default function Historic() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white flex flex-col items-center  pt-28 px-4 pb-8 relative">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold pb-pb-1.5">Histórico</h1>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 md:mb-4">
            <p className="text-sm text-gray-500">
              Histórico com todas as reservas realizadas pelo cliente:
            </p>
          </div>
        </div>
      </main>
    </>
  )
}
