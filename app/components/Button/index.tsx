import React from "react"
import classes from "./index.module.css"

export interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  label?: string
  layout?: 'big' | 'submit' | 'cancel' | 'symbol' | undefined
  className?: string
  color?: 'white' | undefined
  children?: React.ReactNode
  type?: 'button' | 'submit'
  symbol?: 'close' | 'menu'
}

// export const imageUrl = (image: Media, width: number, height: number): string => mediaUrl(`${image.sizes.card.}`)
export const Button: React.FC<Props> = (props) => {
  let { label, layout, color, symbol } = props;
  let updatedProps = { ...props };
  updatedProps.className = `${classes.button} ${props.className}`;
  
  return (
    <button
      data-layout={layout}
      data-color={color}
      data-symbol={symbol}
      {...updatedProps}
    >
      {label || props.children}
    </button>
  )
}

Button.defaultProps = Button.defaultProps || {};
Button.defaultProps['type'] = 'button';

export default Button;
