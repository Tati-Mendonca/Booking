'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [id, setId] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!id) return
    router.push(`/historic/${id}`)
    setMenuOpen(false)
  }

  return (
    <>
      <header className="bg-gray-700 fixed top-0 left-0 w-full z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between">
          <Link href="/">
            <h1 className="text-xl font-bold text-white">Booking 14</h1>
          </Link>

          <button className="text-white focus:outline-none" onClick={() => setMenuOpen(!menuOpen)}>
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </header>

      <div
        className={`fixed top-0 right-0 h-full w-[300px] bg-gray-800 text-white z-50 shadow-lg transform transition-transform duration-300 ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={() => setMenuOpen(false)} className="text-white focus:outline-none">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 pt-0 flex flex-col gap-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <label className="text-sm text-gray-300 font-medium">
              Buscar Histórico:
              <input
                type="text"
                placeholder="ID do cliente..."
                value={id}
                onChange={(e) => setId(e.target.value)}
                className="mt-1 px-3 py-2 rounded bg-gray-700 text-white placeholder:text-gray-400 w-full"
              />
            </label>
          </form>

          <nav className="flex flex-col gap-4 text-lg">
            <Link href="/" onClick={() => setMenuOpen(false)} className="hover:text-gray-300">
              Reservas
            </Link>
            <Link
              href="/customer"
              onClick={() => setMenuOpen(false)}
              className="hover:text-gray-300"
            >
              Clientes
            </Link>
          </nav>
        </div>
      </div>
    </>
  )
}
