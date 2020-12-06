import { useContext } from 'react'
import GifsContext from '../context/GifsContext'

function useGlobalGifs() {
    const { gifs } = useContext(GifsContext)
    if (gifs === undefined)
        throw new Error('useGlobalGifs should be used by a component child of GifContextProvider')
    return gifs
}

export default useGlobalGifs