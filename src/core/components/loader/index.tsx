import React from 'react'
import { TailSpin } from 'react-loader-spinner'

interface IProps {
  height: string
}

export const Loader = ({ height }:IProps) => {
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
        height: `${height}`,
        wight: '100vw',
      }}
      wrapperClass=""
      visible={true}
    />
  )
}
