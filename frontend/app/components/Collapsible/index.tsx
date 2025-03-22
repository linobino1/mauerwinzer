import { useEffect, useRef, useState } from 'react'
import { Button } from '../Button'
import classes from './index.module.css'
import { useTranslation } from 'react-i18next'

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
  maxHeight?: number
}

export const Collapsible: React.FC<Props> = ({ maxHeight = 250, ...props }) => {
  const { t } = useTranslation()
  const ref = useRef<HTMLDivElement>(null)
  const [isCollapsed, setIsCollapsed] = useState(true)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    const height = ref.current?.clientHeight
    const collapse = !!height && height > maxHeight
    setIsActive(collapse)
    setIsCollapsed(collapse)
  }, [ref, maxHeight])

  return (
    <div className={classes.container}>
      <div className={classes.wrapper} style={{ maxHeight: isCollapsed ? maxHeight : undefined }}>
        <div ref={ref}>{props.children}</div>
        {isCollapsed && <div className={classes.overlay} />}
      </div>
      {isCollapsed && (
        <Button onClick={() => setIsCollapsed(false)} layout={'link'}>
          {t('Show more')}
        </Button>
      )}
      {!isCollapsed && isActive && (
        <Button onClick={() => setIsCollapsed(true)} layout={'link'}>
          {t('Show less')}
        </Button>
      )}
    </div>
  )
}
