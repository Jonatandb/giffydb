import React, { Suspense } from 'react'
import './App.css'

import { Route, Link } from 'wouter'
import { GifsContextProvider } from './context/GifsContext'

const HomeComponent = React.lazy(() => import('./pages/Home'))
const SearchResultsComponent = React.lazy(() => import('./pages/SearchResults'))
const DetailComponent = React.lazy(() => import('./pages/Detail'))

export default function App() {
  return (
    <Suspense fallback={null}>
      <div className='App'>
        <section className='App-content'>
          <Link to='/'>
            <figure className="App-logo">
              <img
                alt='GiffyDb main logo'
                src={process.env.PUBLIC_URL + '/logo.png'}
              />
            </figure>
          </Link>
          <GifsContextProvider>
            <Route
              component={HomeComponent}
              path='/'
            />
            <Route
              component={SearchResultsComponent}
              path='/search/:keyword/:rating?/:language?'
            />
            <Route
              component={DetailComponent}
              path="/gif/:id"
            />
            <Route
              component={() => <h1>404 ERROR :(</h1>}
              path="/404"
            />
          </GifsContextProvider>
        </section>
      </div>
    </Suspense>
  )
}
