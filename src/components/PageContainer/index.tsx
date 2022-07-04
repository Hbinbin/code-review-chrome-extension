import { FC, ReactNode } from 'react'
import classNames from 'classnames'
import './index.scss'

interface IProps {
  className?: string
  children?: ReactNode
}

const PageContainer: FC<IProps> = ({ className, children }) => {
  return (
    <div className={classNames('page-container', className)}>{children}</div>
  )
}

export default PageContainer
