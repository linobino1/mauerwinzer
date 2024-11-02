import { cn } from '~/util/cn'

type Props = React.InputHTMLAttributes<HTMLInputElement>

const Input: React.FC<Props> = ({ className, ...props }) => {
  return (
    <input
      className={cn(
        'border-1 mb-2 rounded-sm border-solid border-gray-500 px-1 font-mono text-base outline-none',
        className,
      )}
      {...props}
    />
  )
}
export default Input
