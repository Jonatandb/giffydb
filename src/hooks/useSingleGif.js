import { useEffect, useState } from 'react'
import getSingleGifs from 'services/getSingleGif'
import useGifs from './useGifs'

export default function useSingleGif({ id }) {
    const { gifs } = useGifs()
    const gifFromCache = gifs.find(singleGif => singleGif.id === id)

    const [gif, setGif] = useState(gifFromCache)

    useEffect(() => {
        if (!gif) {
            getSingleGifs({ id })
                .then(setGif)
        }
    }, [gif, id])

    return { gif }
}