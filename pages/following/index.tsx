import React from 'react'

import { NAV_LIST } from '@/constants/nav'
import Head from 'next/head'

import Nav from '@/components/nav/NavBar'

const Home = () => {
  return (
    <>
      <Head>
        <title>아름다운 무료 이미지 및 사진 | following</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav nav={NAV_LIST} />
    </>
  )
}

export default Home
