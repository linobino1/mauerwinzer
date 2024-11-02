import { cn } from '~/util/cn'

type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement>

const Textarea: React.FC<Props> = ({ className, ...props }) => {
  return (
    <textarea
      className={cn(
        'border-1 mb-2 h-[10em] w-full rounded border-gray-500 font-mono text-base',
        className,
      )}
      {...props}
    />
  )
}
export default Textarea
