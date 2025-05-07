export function formatDate(dateString: Date, showYear = false) {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: showYear ? 'numeric' : undefined,
  }).format(date)
}
