import React from 'react'
import { Link, useLocation, useParams, useRouteMatch } from 'react-router-dom'

interface ResultsProps {
  addresses: string[]
  page: number
  pages: number
}

export default function SearchResults(
  { addresses, page, pages }: ResultsProps
) {
  return (
    <>
      <h1>Search Results</h1>
      {addresses.length
      ? <Results addresses={addresses} page={page} pages={pages} />
      : <NoResults />}
    </>
  )
}

function Results({ addresses, page, pages }: ResultsProps) {
  const { gid } = useParams<{ gid: string }>()
  return (
    <>
      <ul>
        {addresses.map((address) =>
          <li key={address}>
            <Link to={`/game/${gid}/address/${encodeURIComponent(address)}`}>{address}</Link>
          </li>
        )}
      </ul>
      {pages > 1 ? <Pages page={page} pages={pages} /> : null}
    </>
  )
}

interface PagesProps {
  page: number
  pages: number
}

function Pages({ page, pages }: PagesProps) {
  const { url } = useRouteMatch()
  const { search } = useLocation()
  const prevPageSearch = new URLSearchParams(search)
  if (page - 1 === 1) prevPageSearch.delete('page')
  else prevPageSearch.set('page', String(page - 1))
  const nextPageSearch = new URLSearchParams(search)
  nextPageSearch.set('page', String(page + 1))
  return (
    <>
      <div>
        {page > 1 ? <Link to={`${url}?${prevPageSearch}`}>Previous</Link> : null} {page !== pages ? <Link to={`${url}?${nextPageSearch}`}>Next</Link> : null}
      </div>
      <div>Page {page} of {pages}</div>
    </>
  )
}

function NoResults() {
  return <div>No results.</div>
}
