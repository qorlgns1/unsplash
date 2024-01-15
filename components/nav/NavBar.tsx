import React from 'react'

import type { Nav } from '@/constants/nav'
import styled from '@emotion/styled'

import NavLink from '@/components/nav/NavLink'

interface Props {
  nav: Nav[][]
}

const NavBar = ({ nav }: Props) => {
  return (
    <Navigation>
      {nav.map((nav, index) => (
        <Ul key={index}>
          {nav.map((item, index) => (
            <li key={index}>
              <NavLink href={item.link}>{item.title}</NavLink>
            </li>
          ))}
        </Ul>
      ))}
    </Navigation>
  )
}

const Navigation = styled.nav`
  padding: 0 2rem;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ddd;

  > ul:first-of-type {
    ::after {
      content: '';
      display: block;
      height: 3.2rem;
      margin: 0 0.8rem;
      width: 1px;

      border-right: 1px solid #ddd;

      background-color: #ddd;
    }
  }

  > ul:last-of-type {
    overflow-x: auto;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`

const Ul = styled.ul`
  display: flex;
  align-items: center;
  gap: 3rem;
  padding-left: 2rem;
`

export default NavBar
