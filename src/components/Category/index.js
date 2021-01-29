import Spinner from 'components/Spinner'
import React from 'react'
import { Link } from 'wouter'
import './styles.css'

export default function Category({ name, options = [] }) {
    return <>
        <h3 className="Category-title">{name}</h3>
        <ul className="Category-list">
            {!options.length && <Spinner centered />}
            {options.map((singleOption) => (
                <li key={singleOption}>
                    <Link
                        className="Category-link"
                        to={`/search/${singleOption}`}
                    >
                        {singleOption}
                    </Link>
                </li>
            ))}
        </ul>
    </>
}
