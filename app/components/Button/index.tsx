import React from "react"
import classes from "./index.module.css"

export interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  label?: string
  layout?: 'big' | 'submit' | 'cancel' | undefined
  className?: string
  color?: 'white' | undefined
  children?: React.ReactNode
  type?: 'button' | 'submit'
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
      {label || props.children}
    </button>
  )
}

Button.defaultProps = Button.defaultProps || {};
Button.defaultProps['type'] = 'button';

export default Button;
