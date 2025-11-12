'use client';
import React from 'react';
import styles from './chip.module.scss';

interface ChipProps {
  label: string;
  state?: 'active' | 'rest' | 'disabled';
  onClick?: () => void;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

const Chip: React.FC<ChipProps> = ({
  label,
  state = 'rest',
  onClick,
  iconLeft,
  iconRight,
}) => {
  // Menentukan kelas berdasarkan state
  const chipClassName = `
    ${styles.chip} 
    ${state === 'active' ? styles['chip-active'] : ''} 
    ${state === 'rest' ? styles['chip-rest'] : ''} 
    ${state === 'disabled' ? styles['chip-disabled'] : ''}
  `;

  return (
    <button
      className={chipClassName}
      onClick={state !== 'disabled' ? onClick : undefined}
      disabled={state === 'disabled'}
    >
      {iconLeft && <span className={styles['icon-left']}>{iconLeft}</span>}
      <span className={styles['chip-label']}>{label}</span>
      {iconRight && <span className={styles['icon-right']}>{iconRight}</span>}
    </button>
  );
};

export default Chip;