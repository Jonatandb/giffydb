import React, { useCallback } from "react"
import ListOfGifs from 'components/ListOfGifs'
import Spinner from "components/Spinner"
import TrendingSearches from "components/TrendingSearches"
import useGifs from 'hooks/useGifs'
import SearchForm from "components/SearchForm"
import { useLocation } from 'wouter'

export default function Home() {
  const { gifs, loading } = useGifs()
  const [, pushLocation] = useLocation()

  const handleSumbit = useCallback(({ keyword }) => {
    pushLocation(`/search/${keyword.trim()}`)
  }, [pushLocation])

  if (loading) return <Spinner />

  return (
    <>
      <SearchForm onSubmit={handleSumbit} />
      <div className="App-main">
        {
          !loading && gifs.length > 0 && <div className="App-results">
            <h3 className="App-title">Última búsqueda</h3>
            <ListOfGifs gifs={gifs} />
          </div>
        }
        <div className="App-category">
          <TrendingSearches />
        </div>
      </div>
    </>
  )
}