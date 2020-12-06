import React, { useState } from "react"
import { Link, useLocation } from "wouter"
import ListOfGifs from '../../components/ListOfGifs'
import useGifs from '../../hooks/useGifs'

const POPULAR_GIFS = ["Astronomy", "Space", "Sci-fi"]

export default function Home() {
  const [keyword, setKeyword] = useState('')
  const [path, pushLocation] = useLocation()
  const { gifs, loading } = useGifs()

  const handleSumbit = evt => {
    evt.preventDefault()
    pushLocation(`/search/${keyword}`)
  }

  const handleChange = evt => {
    setKeyword(evt.target.value)
  }

  return (
    <>
      <form onSubmit={handleSumbit}>
        <input onChange={handleChange} type="text" value={keyword} />
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