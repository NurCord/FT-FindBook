import React from 'react'
import { UilArrowCircleLeft } from '@iconscout/react-unicons'

export default function AdminBooK() {
  const handleOnClick = () => {
    window.history.back()
  }
  return (
    <div>
      <div>
        <button onClick={handleOnClick}>
          <UilArrowCircleLeft/>
        </button>
      </div>
    </div>
  )
}
