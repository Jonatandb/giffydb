import React, { useEffect, useState } from 'react'
import Gif from '../Gif'
import getGifs from '../../services/getGifs'

export default function ListOfGifs({ params }) {
  const [gifs, setGifs] = useState([])
  const [loading, setLoading] = useState(false)

  const { keyword } = params

  useEffect(() => {
    setLoading(true)
    getGifs({ keyword }).then(gifs => {
      setGifs(gifs)
      setLoading(false)
    })
  }, [keyword])

  if (loading) return <i>Cargando...</i>

  return (
    <>
      {gifs.map(({ id, url, title }) => (
        <Gif key={id} id={id} url={url} title={title} />
      ))}
    </>
  )
}
