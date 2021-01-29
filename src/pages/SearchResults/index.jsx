import React from 'react'
import Spinner from 'components/Spinner'
import ListOfGifs from 'components/ListOfGifs'
import useGifs from 'hooks/useGifs'

export default function SearchResults({ params }) {
  const { keyword } = params
  const { loading, loadingNextPage, gifs, setPage } = useGifs({ keyword })

  const handleNextPage = () => setPage(currentPage => currentPage + 1)

  return <>
    {loading
      ? <Spinner />
      : <>
        <h3 className="App-title">{decodeURI(keyword)}</h3>
        <ListOfGifs gifs={gifs} />
        <button
          style={{
            color: 'white',
            backgroundColor: '#3ea6ff',
            borderRadius: '5px'
          }}
          onClick={handleNextPage}
          disabled={loadingNextPage}
        >Get next page</button>
      </>
    }
  </>
}
