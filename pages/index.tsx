import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const a: number = 3;
  const b: number = 4;
  const c: number = 5;

  console.log((c * c) === (a*a) + (b*b))

  return (
    <div>
      <p>{(c * c) === (a*a) + (b*b) ? 'True' : 'False'}</p>
    </div>
  )
}

export default Home
