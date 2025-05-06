import React, { useState, useEffect } from 'react'

const BookingForm = () => {
  // const BookingForm = ({ initialData = null, onSubmit, clients }) => {
  //   const [entryDate, setEntryDate] = useState(initialData?.entryDate || '')
  //   const [exitDate, setExitDate] = useState(initialData?.exitDate || '')
  //   const [price, setPrice] = useState(initialData?.price || '')
  //   const [clientId, setClientId] = useState(initialData?.clientId || '')

  // const handleSubmit = (e) => {
  //   e.preventDefault()
  //   const bookingData = {
  //     entryDate,
  //     exitDate,
  //     price,
  //     clientId,
  //   }

  // if (initialData?.id) {
  //   bookingData.id = initialData.id // Edição
  // }

  //   onSubmit(bookingData)
  // }

  return (
    <form className="booking-form">
      {/* <form onSubmit={handleSubmit} className="booking-form"></form> */}

      <div className="flex justify-between items-baseline">
        <label>
          Name:
          <input
            type="search"
            placeholder="Digite o nome"
            id="name-search"
            className="w-65 px-2 m-2 bg-white rounded"
          ></input>
          {/* <select
          value={clientId}
          onChange={(e) => setClientId(e.target.value)}
          required
          >
          <option value="">Selecione um cliente</option>
          {clients.map((client) => (
            <option key={client.id} value={client.id}>
              {client.name}
            </option>
          ))}
          </select> */}
        </label>

        <label>
          Preço:
          <input
            type="text"
            // value={price}
            // onChange={(e) => setPrice(e.target.value)}
            required
            className="w-20 bg-white px-2 ml-2 rounded"
          />
        </label>
      </div>

      <div className="flex justify-between items-baseline">
        <label>
          Entrada:
          <input type="date" className="px-2 m-2 bg-white rounded"></input>
          {/* <select
          value={clientId}
          onChange={(e) => setClientId(e.target.value)}
          required
          >
          <option value="">Selecione um cliente</option>
          {clients.map((client) => (
            <option key={client.id} value={client.id}>
              {client.name}
            </option>
          ))}
          </select> */}
        </label>

        <label>
          Saída:
          <input
            type="date"
            // value={price}
            // onChange={(e) => setPrice(e.target.value)}
            required
            className=" bg-white px-2 ml-2 rounded"
          />
        </label>
      </div>

      {/* <button type="submit">{initialData ? 'Atualizar Reserva' : 'Cadastrar Reserva'}</button> */}
    </form>
  )
}

export default BookingForm
