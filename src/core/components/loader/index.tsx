import React from 'react'
import { TailSpin } from 'react-loader-spinner'

export const Loader = () => {
  return (
    <TailSpin
      height="80"
      width="80"
      color="#111"
      ariaLabel="tail-spin-loading"
      radius="1"
      wrapperStyle={{
        display: 'grid',
        placeItems: 'center',
        height: '100vh',
        wight: '100vw',
      }}
      wrapperClass=""
      visible={true}
    />
  )
}
