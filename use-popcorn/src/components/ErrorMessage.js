import React from 'react'

export const ErrorMesage = ({message}) => {
  return (
    <p className='error'>
        <span>⛔️</span>{message}
    </p>
  )
}


