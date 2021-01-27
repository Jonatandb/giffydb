import React, { useState, useRef } from "react"
import { useLocation } from "wouter"
import Category from "../../components/Category"
import ListOfGifs from '../../components/ListOfGifs'
import Spinner from "../../components/Spinner"
import useGifs from '../../hooks/useGifs'

const POPULAR_GIFS = ["Astronomy", "Space", "Sci-fi"]

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

  if (loading) return <Spinner />

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
        <Category
          className="App-category"
          name="Categorías populares"
          options={POPULAR_GIFS} />
      </div>
    </>
  )
}