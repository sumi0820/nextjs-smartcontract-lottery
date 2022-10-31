import type { NextPage } from 'next'
import Head from 'next/head'
import LotteryEntrance from '../components/LotteryEntrance'
import Header from '../components/Header'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => (
  <div className={styles.container}>
    <Head>
      <title>Smart contract Lottery</title>
      <meta name='description' content='Smart contract Lottery' />
      <link rel='icon' href='/favicon.ico' />
    </Head>
    <Header />
    <LotteryEntrance />
    <h1 className='text-3xl font-bold underline'>Hello world</h1>
  </div>
)

export default Home
