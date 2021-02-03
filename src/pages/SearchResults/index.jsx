import React, { useCallback, useEffect, useRef } from 'react'
import Spinner from 'components/Spinner'
import ListOfGifs from 'components/ListOfGifs'
import useGifs from 'hooks/useGifs'
import useNearScreen from 'hooks/useNearScreen'
import debounce from 'just-debounce-it'

export default function SearchResults({ params }) {
  const { keyword } = params
  const { loading, loadingNextPage, gifs, setPage } = useGifs({ keyword })
  const ref = useRef()
  const { isNearScreen } = useNearScreen({ externalRef: loading ? null : ref, once: false })

  const debouncedHandleNextPage = useCallback(() => debounce(setPage(currentPage => currentPage + 1), 1000), [setPage])

  useEffect(() => {
    if (isNearScreen) {
      debouncedHandleNextPage()
    }
  }, [debouncedHandleNextPage, isNearScreen, setPage])

  return <>
    {loading
      ? <Spinner />
      : <>
        <h3 className="App-title">{decodeURI(keyword)}</h3>
        <ListOfGifs gifs={gifs} />
        <div ref={ref} id="visor"></div>
      </>
    }
  </>
}
