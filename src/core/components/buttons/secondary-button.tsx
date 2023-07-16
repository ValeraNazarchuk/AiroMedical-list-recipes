import React from 'react'
import { createStyleSheet } from '../../helpers/style.helper'

interface IProps {
  text: string
  type?: 'submit' | 'reset' | 'button' 
  autoFocus?: boolean
  disabled?: boolean
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  individualStyle?: React.CSSProperties
}

export const SecondaryButton = ({
  text,
  type,
  autoFocus,
  disabled,
  onClick,
  individualStyle,
}: IProps) => {
  const styles = createStyleSheet({
    buttonStyle: {
      color: '#000',
      backgroundColor: '#fff',
      border: '1px #000 solid',
      transition: 'all 0.3s ease 0s',
      fontSize: '14px',
      padding: '11px 36px',
      borderRadius: '32px',
      fontWeight: '400',
      cursor: !disabled ? 'pointer' : 'no-drop',
      ...individualStyle,
    },
  })

  return (
    <button
      style={styles.buttonStyle}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  )
}
