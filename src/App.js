import React, { useEffect, useState } from 'react'

import './App.css'

import getGifs from './services'

function App() {
  const [gifs, setGifs] = useState([])

  useEffect(() => {
    getGifs({ keyword: 'matrix' }).then(gifs => {
      setGifs(gifs)
    })
  }, [])

  return (
    <div className='App'>
      <section className='App-content'>
        <span>Jonatandb 2020</span>
        {gifs.map(gif => (
          <img key={gif.id} src={gif.url} alt={gif.title} />
        ))}
      </section>
    </div>
  )
}

export default App
