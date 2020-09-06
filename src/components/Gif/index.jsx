import React from 'react'

export default function Gif({ id, url, title }) {
  return <img src={url} alt={title} style={{ padding: '10px' }} />
}
