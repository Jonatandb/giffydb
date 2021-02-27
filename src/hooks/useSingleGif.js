import { useEffect, useState } from 'react'
import getSingleGifs from 'services/getSingleGif'
import useGifs from './useGifs'

export default function useSingleGif({ id }) {
    const { gifs } = useGifs()
    const gifFromCache = gifs.find(singleGif => singleGif.id === id)
    const [gif, setGif] = useState(gifFromCache)
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    useEffect(() => {
        if (!gif) {
            setIsLoading(true)
            getSingleGifs({ id })
                .then(singleGif => {
                    setGif(singleGif)
                    setIsLoading(false)
                    setIsError(false)
                })
                .catch(e => {
                    setIsLoading(false)
                    setIsError(true)
                })
        }
    }, [gif, id])

    return { gif, isLoading, isError }
}