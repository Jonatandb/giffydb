import React, { useEffect, useState } from 'react'
import Gif from '../Gif'
import getGifs from '../../services/getGifs'

export default function ListOfGifs({ params }) {
  const [gifs, setGifs] = useState([])

  const { keyword } = params

  useEffect(() => {
    getGifs({ keyword }).then(gifs => {
      setGifs(gifs)
    })
  }, [keyword])
  return (
    <>
      {gifs.map(({ id, url, title }) => (
        <Gif key={id} id={id} url={url} title={title} />
      ))}
    </>
  )
}
