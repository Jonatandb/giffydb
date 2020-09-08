import React from 'react'
import { Route, Link } from 'wouter'
import './App.css'
import ListOfGifs from './components/ListOfGifs'

function App() {
  return (
    <div className='App'>
      <section className='App-content'>
        <span>Jonatandb 2020</span>
        <Link to='/gif/panda'>Gifs de pandas</Link>
        <Link to='/gif/programming'>Gifs de programación</Link>
        <Link to='/gif/messi'>Gifs de Messi</Link>
        <Route component={ListOfGifs} path='/gif/:keyword' />
      </section>
    </div>
  )
}

export default App
