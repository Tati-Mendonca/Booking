import Link from 'next/link'

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full bg-gray-700 shadow-md z-50">
      <div className="max-w-7xl mx-auto px-5 py-5 flex items-center justify-between">
        <h1 className="text-xl font-bold text-white">Booking 14</h1>

        <nav className="hidden md:flex gap-6 text-sm text-gray-600">
          <Link href="/" className=" text-white hover:text-gray-400 transition">
            INÍCIO
          </Link>
          <Link href="/customer" className=" text-white hover:text-gray-400 transition">
            CLIENTES
          </Link>
          <Link href="/historic" className=" text-white hover:text-gray-400 transition">
            HISTÓRICO
          </Link>
        </nav>

        <div className="md:hidden pt-1.5">
          <button className="text-white focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}
