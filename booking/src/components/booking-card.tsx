type Props = {
  customerName: string
  input: string
  output: string
  price: string
  days: number
}

export function BookingCard({ customerName, input, output, price, days }: Props) {
  return (
    <>
      <div className=" w-full bg-gray-200 rounded-lg p-4 pt-2 shadow-sm">
        <header className="flex justify-between">
          <span>{customerName}</span>
          <span className="text-sm">Diárias: {days}</span>
        </header>
        <hr className="mb-2" />
        <section className="flex justify-between items-center text-sm text-gray-700">
          <ul>
            <li>{input}</li>
            <li>{output}</li>
          </ul>
          <p className="text-black">Preço: R$ {price}</p>
          <button className="text-sm text-gray-500 underline">Remover</button>
        </section>
      </div>
    </>
  )
}
