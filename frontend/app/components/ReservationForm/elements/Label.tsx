import { cn } from '~/util/cn'

type Props = React.LabelHTMLAttributes<HTMLLabelElement>

const Label: React.FC<Props> = ({ className, ...props }) => {
  return <label className={cn('mb-1 block text-lg font-thin', className)} {...props} />
}
export default Label
