'use client'

type Props = {
  currentMonth: string
}

export default function Input({ currentMonth }: Props) {
  return (
    <input
      type="month"
      defaultValue={currentMonth}
      onChange={(e) => {
        const selectedMonth = e.target.value
        window.location.search = `?month=${selectedMonth}`
      }}
      className="bg-white border border-gray-300 shadow-sm rounded px-3 py-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
    />
  )
}
