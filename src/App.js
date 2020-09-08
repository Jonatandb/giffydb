import React from 'react'
import { Route } from 'wouter'
import './App.css'
import ListOfGifs from './components/ListOfGifs'

function App() {
  return (
    <div className='App'>
      <section className='App-content'>
        <span>Jonatandb 2020</span>
        <a href='/gif/panda'>Gifs de pandas</a>
        <a href='/gif/programming'>Gifs de programación</a>
        <a href='/gif/messi'>Gifs de Messi</a>
        <Route component={ListOfGifs} path='/gif/:keyword' />
      </section>
    </div>
  )
}

export default App
