import React from 'react'
import { Link, useLocation, useParams, useRouteMatch } from 'react-router-dom'
import styled from 'styled-components'

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

const ResultsList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  background-color: rgba(0, 0, 0, .05);
`

const ResultListItem = styled.li`
  padding: .5rem;

  &:nth-child(2n+1) {
    background-color: rgba(0, 0, 0, .05);
  }
`

function Results({ addresses, page, pages }: ResultsProps) {
  const { gid } = useParams<{ gid: string }>()
  return (
    <>
      <ResultsList>
        {addresses.map((address) =>
          <ResultListItem key={address}>
            <Link to={`/game/${gid}/address/${encodeURIComponent(address)}`}>{address}</Link>
          </ResultListItem>
        )}
      </ResultsList>
      {pages > 1 ? <Pages page={page} pages={pages} /> : null}
    </>
  )
}

const PagesNav = styled.nav`
  margin-top: 1rem;
`

const Links = styled.ol`
  display: flex;
  justify-content: space-between;
  margin: 0;
  padding: 0;
  list-style: none;
`

const DisabledLink = styled.span`
  opacity: .5;
`

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
    <PagesNav>
      <Links>
        <li>{page > 1 ? <Link to={`${url}?${prevPageSearch}`}>Prev</Link> : <DisabledLink>Prev</DisabledLink>}</li>
        {Array(pages).fill(0).map((_, index) => {
          const nthPage = index + 1
          const nthSearch = new URLSearchParams(search)
          if (index > 0) nthSearch.set('page', String(nthPage))
          return (
            <li key={index}>{
              nthPage === page
              ? <b>{nthPage}</b>
              : <Link to={`${url}?${nthSearch}`}>{nthPage}</Link>
            }</li>
          )
        })}
        <li>{page !== pages ? <Link to={`${url}?${nextPageSearch}`}>Next</Link> : <DisabledLink>Next</DisabledLink>}</li>
      </Links>
    </PagesNav>
  )
}

function NoResults() {
  return <div>No results.</div>
}
