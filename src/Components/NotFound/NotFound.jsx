import React from 'react'
import styles from'./NotFound.module.css'
import NotFoundImg from '../../Assets/images/error.svg'

export default function NotFound() {
  return (
  <section className='container my-5'>
<img  src={NotFoundImg} className='w-100' alt='' />
  </section>
  )
}
 