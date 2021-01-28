import React, { useEffect, useState } from 'react'
import getTrendingTerms from 'services/getTrendingTermsService'
import Category from 'components/Category'

const TrendingSearches = () => {
    const [trends, setTrends] = useState([])

    useEffect(() => {
        let mounted = true
        getTrendingTerms().then(newTrends => mounted && setTrends(newTrends))
        return () => mounted = false
    }, [])

    return <Category name="Tendencias" options={trends} />
}

export default TrendingSearches