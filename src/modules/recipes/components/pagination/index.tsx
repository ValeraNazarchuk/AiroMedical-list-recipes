import React, { FC } from 'react'
import styles from './style.module.css'

interface IProps {
  page: number
  onClickNextPage: () => void
  onClickPrevPage: () => void
}

export const Pagination: FC<IProps> = ({
  page,
  onClickNextPage,
  onClickPrevPage,
}) => {
  return (
    <div className={styles.box}>
      <button onClick={onClickPrevPage} disabled={page < 2}>
        Prev
      </button>
      <div>{page}</div>
      <button onClick={onClickNextPage}>Next</button>
    </div>
  )
}
