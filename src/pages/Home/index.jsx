import React from "react"
import ListOfGifs from 'components/ListOfGifs'
import Spinner from "components/Spinner"
import TrendingSearches from "components/TrendingSearches"
import useGifs from 'hooks/useGifs'
import SearchForm from "components/SearchForm"
import { Helmet } from 'react-helmet'

export default function Home() {
  const { gifs, loading } = useGifs()

  if (loading) {
    return (
      <>
        <Helmet>
          <title>Loading... | GiffyDb | Searching gifs by Jonatandb</title>
          <meta name="description" content="GiffyDb | Searching gifs by Jonatandb" />
        </Helmet>
        <Spinner />
      </>
    )
  }

  return (
    <>
      <Helmet>
        <title>Home | GiffyDb | Searching gifs by Jonatandb</title>
        <meta name="description" content="GiffyDb | Searching gifs by Jonatandb" />
      </Helmet>
      <SearchForm />
      <div className="App-main">
        {
          !loading && gifs.length > 0 && (
            <div className="App-results">
              <h3 className="App-title">Última búsqueda</h3>
              <ListOfGifs gifs={gifs} />
            </div>
          )
        }
        <div className="App-category">
          <TrendingSearches />
        </div>
      </div>
    </>
  )
}