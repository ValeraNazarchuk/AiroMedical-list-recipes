import React, { useState, useEffect } from 'react'
import styles from './styles.module.css'
import { useLocation } from 'react-router-dom'

export const RecipeDetailedPage: React.FC = () => {
  const location = useLocation()
  const { info } = location.state

  // console.log(info)

  return (
    <div>
      <div>
        <h2>{info.name}</h2>
        <img src={info.image_url} alt="Beer" />
      </div>
      <div>
        <p>{info.description}</p>
        <div>
          <h3>Brewers tips</h3>
          <p>{info.brewers_tips}</p>
        </div>
      </div>
    </div>
  )
}
