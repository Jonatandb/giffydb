import React, { useEffect, useState } from 'react'

import Gif from './components/Gif'

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
        {gifs.map(({ id, url, title }) => (
          <Gif key={id} id={id} url={url} title={title} />
        ))}
      </section>
    </div>
  )
}

export default App
