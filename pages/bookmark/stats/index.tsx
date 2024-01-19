import React from 'react'

import Head from 'next/head'

import styled from '@emotion/styled'

import NavLink from '@/components/nav/NavLink'

import { BOOKMARK_NAV_LIST } from '@/constants/nav'

const Home = () => {
  return (
    <>
      <Head>
        <title>아름다운 무료 이미지 및 사진 | stats</title>
      </Head>

      <nav>
        <Ul>
          {BOOKMARK_NAV_LIST.map((nav) => (
            <li key={nav.link}>
              <NavLink href={nav.link}>{nav.title}</NavLink>
            </li>
          ))}
        </Ul>
      </nav>

      <div>stats</div>
    </>
  )
}

const Ul = styled.ul`
  margin: 0 auto;

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 3rem;
`

export default Home
