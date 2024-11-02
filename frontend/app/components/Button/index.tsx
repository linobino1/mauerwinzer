import React from 'react'
import classes from './index.module.css'
import { useTranslation } from 'react-i18next'

export type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  layout?: 'big' | 'submit' | 'cancel' | 'symbol' | undefined
  className?: string
  color?: 'white' | undefined
  children?: React.ReactNode
  symbol?: 'close' | 'menu'
}

export const Button: React.FC<Props> = ({ layout, color, symbol, className, ...props }) => {
  const { t } = useTranslation()
  className = `${classes.button} ${className}`

  const symbolLabelMap = {
    close: t('Close'),
    menu: t('Menu'),
  }

  return (
    <button
      data-layout={layout}
      data-color={color}
      data-symbol={symbol}
      aria-label={symbol ? symbolLabelMap[symbol] : props['aria-label']}
      className={className}
      {...props}
    />
  )
}

export default Button
