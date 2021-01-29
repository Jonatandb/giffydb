import React from 'react'
import './styles.css'

export default function Spinner({ centered, marginTop, backgroundColor }) {
  return (
    <div style={{
      display: centered ? 'flex' : 'inherit',
      justifyContent: centered ? 'center' : '',
      marginTop: marginTop ? marginTop : 25,
      backgroundColor: backgroundColor ? backgroundColor : ''
    }}>
      <div className='lds-ring'>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}
