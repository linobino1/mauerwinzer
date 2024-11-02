import { cn } from '~/util/cn'

type Props = React.LabelHTMLAttributes<HTMLLabelElement> & {
  required?: boolean
}

const Label: React.FC<Props> = ({ required, children, className, ...props }) => {
  return (
    <label className={cn('mb-1 block font-thin', className)} {...props}>
      {children}
      {required && <span className="text-red-500">*</span>}
    </label>
  )
}
export default Label
