import React, { useState } from "react"
import { useRef } from "react"
import { Link, useLocation } from "wouter"
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
        <input
          value={keyword}
          onChange={handleChange}
          placeholder="Search a gif here..."
          type="text"
          ref={searchInputRef} />
        <button>Buscar</button>
      </form>
      <h3 className="App-title">Última búsqueda</h3>
      <ListOfGifs gifs={gifs} />
      <h3 className="App-title">Los gifs más populares</h3>
      <ul>
        {POPULAR_GIFS.map((popularGif) => (
          <li key={popularGif}>
            <Link to={`/search/${popularGif}`}>Gifs de {popularGif}</Link>
          </li>
        ))}
      </ul>
    </>
  )
}