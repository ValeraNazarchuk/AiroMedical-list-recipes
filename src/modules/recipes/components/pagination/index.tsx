import React, { FC } from 'react'
import styles from './style.module.css'
import { PrimaryButton } from '../../../../core/components/buttons/primary-button'
import { SecondaryButton } from '../../../../core/components/buttons/secondary-button'

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
      <SecondaryButton
        text={'Prev'}
        onClick={onClickPrevPage}
        disabled={page < 2}
      />
      <p className={styles.text}>{page}</p>
      <PrimaryButton text={'Next'} onClick={onClickNextPage} />
    </div>
  )
}
