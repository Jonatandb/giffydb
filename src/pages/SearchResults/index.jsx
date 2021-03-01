import React, { useCallback, useEffect, useRef } from 'react'
import Spinner from 'components/Spinner'
import ListOfGifs from 'components/ListOfGifs'
import useGifs from 'hooks/useGifs'
import useNearScreen from 'hooks/useNearScreen'
import debounce from 'just-debounce-it'
import { Helmet } from 'react-helmet'
import SearchForm from '../../components/SearchForm'

export default function SearchResults({ params }) {
  const { keyword } = params
  const { loading, gifs, setPage } = useGifs({ keyword })
  const ref = useRef()
  const { isNearScreen } = useNearScreen({ externalRef: loading ? null : ref, once: false })

  const debouncedHandleNextPage = useCallback(() => debounce(setPage(currentPage => currentPage + 1), 1000), [setPage], [])

  const title = gifs ? `${gifs.length} results of ${decodeURI(keyword)} | GiffyDb | Searching gifs by Jonatandb` : 'GiffyDb | Searching gifs by Jonatandb'

  useEffect(() => {
    if (isNearScreen) {
      debouncedHandleNextPage()
    }
  }, [debouncedHandleNextPage, isNearScreen, setPage])

  if (loading) {
    return (
      <>
        <Helmet>
          <title>Loading... | GiffyDb | Searching gifs by Jonatandb</title>
          <meta name="description" content="GiffyDb | Searching gifs by Jonatandb" />
        </Helmet>
        <Spinner />
      </>
    )
  }

  return <>
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={decodeURI(title)} />
    </Helmet>
    <SearchForm />
    <h3 className="App-title">{decodeURI(keyword)}</h3>
    <ListOfGifs gifs={gifs} />
    <div ref={ref} id="visor"></div>
  </>
}
