import React, { FC } from 'react'
import { Container } from '@cps'
import './index.scss'

interface IProps {}

const Popup: FC<IProps> = () => {
  console.log(33425)
  return (
    <div className='popup-container'>
      记账本
    </div>
  )
}
export default Popup
