import React from 'react'
import Gif from 'components/Gif'
import useSingleGif from 'hooks/useSingleGif'
import Spinner from 'components/Spinner'
import { Redirect } from 'wouter'
import { Helmet } from 'react-helmet'

export default function Detail({ params }) {
    const { gif, isLoading, isError } = useSingleGif({ id: params.id })

    const title = gif ? gif.title : 'GiffyDb | Searching gifs by Jonatandb'

    if (isLoading) {
        return (
            <>
                <Helmet>
                    <title>Cargando... | GiffyDb | Searching gifs by Jonatandb</title>
                    <meta name="description" content="GiffyDb | Searching gifs by Jonatandb" />
                </Helmet>
                <Spinner />
            </>
        )
    }

    if (isError) return <Redirect to="/404" />

    if (!gif) return null

    return <>
        <Helmet>
            <title>{`${title} | GiffyDb`}</title>
            <meta name="description" content={decodeURI(title)} />
        </Helmet>
        <h3 className="App-title">{gif.title}</h3>
        <Gif {...gif} />
    </>
}