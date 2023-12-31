import React, { FC } from 'react'
import styles from './style.module.css'
import { Link } from 'react-router-dom'
import {Beer} from '../../interface/index'

interface IProps {
  info: Beer
  handleRecipeClick: (e: React.MouseEvent<HTMLLIElement>, id: number) => void
  selectedRecipes: Set<number>
}

export const RecipeCard: FC<IProps> = ({
  info,
  handleRecipeClick,
  selectedRecipes,
}) => {
  const truncateString = (str: string): string => {
    return str.length > 270 ? str.slice(0, 270).trim() + '...' : str
  }
  
  return (
    <Link 
      className={styles.box} 
      to={`/recipes/${info.id}`} state={{info}} >
      <li
        onContextMenu={(e) => handleRecipeClick(e, info.id)}
        className={styles.item}
        style={{
          background: selectedRecipes.has(info.id) ? 'lightgray' : 'white',
        }}
      >
        <img className={styles.img} src={info.image_url} alt="" />
        <div className={styles.content}>
          <h4 className={styles.title}>{info.name}</h4>
          <p className={styles.description}>
            {truncateString(info.description)}
          </p>
        </div>
      </li>
    </Link>
  )
}
