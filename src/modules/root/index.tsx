import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { routersConfig } from '../../config/private-routes.config'

export const CRouter = (): JSX.Element => {
  return (
    <Routes>
      {routersConfig.map((it) => {
        return <Route path={it.path} key={it.path} element={it.element} />
      })}
    </Routes>
  )
}
