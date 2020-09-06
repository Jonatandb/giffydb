import React, { useEffect, useState } from 'react'

import './App.css'

import getGifs from './services'

import ListOfGifs from './components/ListOfGifs'

function App() {
  const [gifs, setGifs] = useState([])

  useEffect(() => {
    getGifs({ keyword: 'messi' }).then(gifs => {
      setGifs(gifs)
    })
  }, [])

  return (
    <div className='App'>
      <section className='App-content'>
        <span>Jonatandb 2020</span>
        <ListOfGifs gifs={gifs} />
      </section>
    </div>
  )
}

export default App
