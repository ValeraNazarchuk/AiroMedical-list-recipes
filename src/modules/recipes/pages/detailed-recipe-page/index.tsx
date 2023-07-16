import React from 'react'
import styles from './styles.module.css'
import { Link, useLocation } from 'react-router-dom'
import { SecondaryButton } from '../../../../core/components/buttons/secondary-button'

export const RecipeDetailedPage: React.FC = () => {
  const location = useLocation()
  const { info } = location.state

  return (
    <div className={styles.wrapper}>
      <div className={styles.box}>
        <Link to={`/recipes`} className={styles.linkBack}>
          <SecondaryButton text={'Back'} />
        </Link>
        <h2 className={styles.title}>{info.name}</h2>
        <p className={styles.date}>{info.first_brewed}</p>
        <img className={styles.img} src={info.image_url} alt="Beer" />
      </div>
      <div className={styles.content}>
        <div className={styles.contentBox}>
          <h4 className={styles.contentTitle}>Description:</h4>
          <p className={styles.contentText}>{info.description}</p>
        </div>
        <div className={styles.contentBox}>
          <h4 className={styles.contentTitle}>Brewers tips:</h4>
          <p className={styles.contentText}>{info.brewers_tips}</p>
        </div>
        <div className={styles.contentBox}>
          <h4 className={styles.contentTitle}>Tagline:</h4>
          <p className={styles.contentText}>{info.tagline}</p>
        </div>
        <div className={styles.contentBox}>
          <h4 className={styles.contentTitle}>Food pairing:</h4>
          {info.food_pairing.map((food: string, index: number) => {
            return (
              <div key={index} style={{ display: 'flex' }}>
                <p className={styles.contentText}>{index + 1}.</p>
                <p className={styles.contentText}>{food}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
