import React from 'react'

import Head from 'next/head'

import Nav from '@/components/nav/NavBar'

import { NAV_LIST } from '@/constants/nav'

const Home = () => {
  return (
    <>
      <Head>
        <title>아름다운 무료 이미지 및 사진 | textures-and-patterns</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav nav={NAV_LIST} />

      <div>textures-and-patterns</div>
    </>
  )
}

export default Home