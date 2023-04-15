import React from "react"
import classes from "./index.module.css"

export interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  label: string
  layout: 'big' | undefined
  className?: string
  color?: 'white' | undefined
}

// export const imageUrl = (image: Media, width: number, height: number): string => mediaUrl(`${image.sizes.card.}`)
export const Button: React.FC<Props> = (props) => {
  const { label, layout, color } = props;
  let updatedProps = { ...props };
  updatedProps.className = `${classes.button} ${props.className}`;
  return (
    <button
      data-layout={layout}
      data-color={color}
      {...updatedProps}
    >
      {label}
    </button>
  )
}

export default Button;
