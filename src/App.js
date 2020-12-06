import React from 'react'
import './App.css'
import Home from './pages/Home'
import SearchResults from './pages/SearchResults'
import Detail from './pages/Detail'

import { Route, Link } from 'wouter'
import { GifsContextProvider } from './context/GifsContext'

export default function App() {
  return (
    <div className='App'>
      <section className='App-content'>
        <Link to='/'>
          <img className='App-logo' alt='GiffyDb logo' src='/logo.png' />
        </Link>
        <GifsContextProvider>
          <Route
            component={Home}
            path='/'
          />
          <Route
            component={SearchResults}
            path='/search/:keyword'
          />
          <Route
            component={Detail}
            path="/gif/:id"
          />
        </GifsContextProvider>
      </section>
    </div>
  )
}
