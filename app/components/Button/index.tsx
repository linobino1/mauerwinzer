import React from "react"
import classes from "./index.module.css"

export type Props = {
  label: string
  layout: 'big' | undefined
  className?: string
  color?: 'white' | undefined
}

// export const imageUrl = (image: Media, width: number, height: number): string => mediaUrl(`${image.sizes.card.}`)
export const Button: React.FC<Props> = ({
  className, label, layout, color,
}) => (
  <button
    className={`${classes.button} ${className}`}
    data-layout={layout}
    data-color={color}
    type="button"
  >
    {label}
  </button>
)

export default Button;
