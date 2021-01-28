import React, { useState, useRef } from "react"
import { useLocation } from "wouter"
import ListOfGifs from 'components/ListOfGifs'
import Spinner from "components/Spinner"
import TrendingSearches from "components/TrendingSearches"
import useGifs from 'hooks/useGifs'

export default function Home() {
  const [keyword, setKeyword] = useState('')
  const [, pushLocation] = useLocation()
  const { gifs, loading } = useGifs()
  const searchInputRef = useRef()

  const handleSumbit = evt => {
    evt.preventDefault()
    if (keyword && keyword.trim()) {
      pushLocation(`/search/${keyword.trim()}`)
    } else {
      searchInputRef.current.select()
      searchInputRef.current.focus()
    }
  }

  const handleChange = evt => {
    setKeyword(evt.target.value)
  }

  if (loading || (!loading && !gifs.length)) return <Spinner />

  return (
    <>
      <form onSubmit={handleSumbit}>
        <button>Buscar</button>
        <input
          onChange={handleChange}
          placeholder="Search a gif here..."
          ref={searchInputRef}
          type="text"
          value={keyword} />
      </form>
      <div className="App-main">
        <div className="App-results">
          <h3 className="App-title">Última búsqueda</h3>
          <ListOfGifs gifs={gifs} />
        </div>
        <div className="App-category">
          <TrendingSearches />
        </div>
      </div>
    </>
  )
}