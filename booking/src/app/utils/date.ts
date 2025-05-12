export function formatDate(dateString: string | Date, showYear = false) {
  const date = String(dateString)
  const [year, month, day] = date.split('-')
  return showYear ? `${day}/${month}/${year}` : `${day}/${month}`
}

export function calculateDays(input: Date | string, output: Date | string): number {
  const inputDate = new Date(input)
  const outputDate = new Date(output)
  const diffTime = outputDate.getTime() - inputDate.getTime()
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}
