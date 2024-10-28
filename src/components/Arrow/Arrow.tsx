import React from 'react'

import styles from './Arrow.module.css'

interface ArrowProps {
  reversed?: boolean
}

const Arrow: React.FC<ArrowProps> = ({ reversed = false }) => (
  <svg
    role="img"
    aria-label={reversed ? 'arrow down' : 'arrow up'}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    className={`${styles.arrow} ${reversed ? styles.reversed : ''}`}
  >
    <path d="m26.71 10.29-10-10a1 1 0 0 0-1.41 0l-10 10 1.41 1.41L15 3.41V32h2V3.41l8.29 8.29z" />
  </svg>
)

export default Arrow
