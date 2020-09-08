import React from 'react'
import './styles.css'
export default function Gif({ id, url, title }) {
  return (
    <a href={`#${id}`} className='Gif'>
      <h4>{title}</h4>
      <img src={url} alt={title} />
    </a>
  )
}
