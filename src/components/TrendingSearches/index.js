import React, { useEffect, useState } from 'react'
import getTrendingTerms from '../../services/getTrendingTermsService'
import Category from '../Category'

const TrendingSearches = () => {
    const [trends, setTrends] = useState([])

    useEffect(() => {
        getTrendingTerms().then(newTrends => setTrends(newTrends))
    }, [])

    return (
        <Category
            name="Tendencias"
            options={trends}
        />
    )
}

export default TrendingSearches
