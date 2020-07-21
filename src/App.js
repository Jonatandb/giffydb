import React, { useEffect, useState } from 'react'

import './App.css'

const API_URL =
  'https://api.giphy.com/v1/gifs/search?api_key=LXEbqW233ZnlA6bFDYONpw0LvLaYcyeH&q=space&limit=25&offset=0&rating=g&lang=es'

function App() {
  const [gifs, setGifs] = useState([])

  useEffect(() => {
    console.log('Obteniendo gifs')

    fetch(API_URL)
      .then(response => response.json())
      .then(jsonResult => {
        setGifs(
          jsonResult.data.map(image => ({
            url: image.images.original.url,
            id: image.id,
            title: image.title,
          }))
        )
      })
  }, [])

  return (
    <div className='App'>
      <section className='App-content'>
        {' '}
        {gifs.map(gif => (
          <img key={gif.id} src={gif.url} alt={gif.title} />
        ))}{' '}
        Jonatandb 2020
      </section>
    </div>
  )
}

export default App
