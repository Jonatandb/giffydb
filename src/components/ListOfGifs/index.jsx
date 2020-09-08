import React, { useEffect, useState } from 'react'
import Gif from '../Gif'
import getGifs from '../../services/getGifs'

export default function ListOfGifs({ params }) {
  const [gifs, setGifs] = useState({
    loading: false,
    results: [],
  })

  const { keyword } = params

  useEffect(() => {
    setGifs(actualGifs => ({ loading: true, results: actualGifs.results }))
    getGifs({ keyword }).then(gifs => {
      setGifs({ loading: false, results: gifs })
    })
  }, [keyword])

  if (gifs.loading) return <i>Cargando...</i>

  return (
    <>
      {gifs.results.map(({ id, url, title }) => (
        <Gif key={id} id={id} url={url} title={title} />
      ))}
    </>
  )
}
