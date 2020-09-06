import React from 'react'
import Gif from '../Gif'

export default function ListOfGifs({ gifs }) {
  return gifs.map(({ id, url, title }) => <Gif key={id} id={id} url={url} title={title} />)
}
