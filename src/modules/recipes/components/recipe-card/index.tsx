import React, { FC } from 'react'
import styles from './style.module.css'
import { Link } from 'react-router-dom'

interface IProps {
  info: any
  handleRecipeClick: any
  selectedRecipes: any
}

export const RecipeCard: FC<IProps> = ({
  info,
  handleRecipeClick,
  selectedRecipes,
}) => {

  return (
    <Link
      className={styles.box}
      to={`/recipes/${info.id}`}>
      <div
        // key={info.id}
        onContextMenu={(e) => handleRecipeClick(e, info.id)}
        className={styles.content}
        style={{
          background: selectedRecipes.has(info.id) ? 'lightblue' : 'white',
          // height: '20vh',
          // display: 'flex'
        }}
      >
        <img className={styles.img} src={info.image_url} alt=""/>
        <div>
          <h4 className={styles.title}>{info.name}</h4>
          <p className={styles.description}>
            {info.description}
          </p>
        </div>
      </div>
    </Link>
  )
}
