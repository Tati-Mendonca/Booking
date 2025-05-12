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
      className="px-2 py-1 w-[163px] text-sm border rounded"
    />
  )
}
