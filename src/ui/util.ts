export function parseGameQuery(query: string) {
  if (!query.includes('?')) return { id: query, search: '' }
  const [id, search] = query.split('?')
  return { id, search }
}
