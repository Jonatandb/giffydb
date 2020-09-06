import React from 'react'

import './App.css'

import ListOfGifs from './components/ListOfGifs'

function App() {
  return (
    <div className='App'>
      <section className='App-content'>
        <span>Jonatandb 2020</span>
        <ListOfGifs keyword='space' />
      </section>
    </div>
  )
}

export default App
