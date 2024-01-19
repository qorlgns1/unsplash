import React, { useEffect, useRef } from 'react'

import styled from '@emotion/styled'

import NavLink from '@/components/nav/NavLink'

import type { Nav } from '@/constants/nav'

interface Props {
  nav: Nav[]
}

const NavBar = ({ nav }: Props) => {
  const navRef = useRef<HTMLDivElement>(null)
  const ulRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const $nav = navRef.current
    const $ul = ulRef.current

    if (!$nav || !$ul) return

    const navSidePadding = parseInt(
      window.getComputedStyle($nav).padding.split(' ')[1].replace('px', ''),
      10
    )

    // overflow 된 것까지 포함한 너비
    const navWidth = $ul.scrollWidth + navSidePadding * 2
    const bodyWidth = document.body.clientWidth

    if (navWidth > bodyWidth) {
      $ul.classList.add('right-blur')
    }

    const addBlurToNavSide = () => {
      const firstLi = $ul.children.item(0)
      const lastLi = $ul.children.item($ul.children.length - 1)

      const firstLiRect = firstLi?.getBoundingClientRect()
      const lastLiRect = lastLi?.getBoundingClientRect()

      if (!firstLiRect || !lastLiRect) return

      if (firstLiRect.left < navSidePadding / 2) {
        $ul.classList.add('left-blur')
      } else {
        $ul.classList.remove('left-blur')
      }

      if (lastLiRect.right > bodyWidth - navSidePadding / 2) {
        $ul.classList.add('right-blur')
      } else {
        $ul.classList.remove('right-blur')
      }
    }

    $ul.addEventListener('scroll', addBlurToNavSide)
    window.addEventListener('resize', addBlurToNavSide)

    return () => {
      $ul.removeEventListener('scroll', addBlurToNavSide)
      window.removeEventListener('resize', addBlurToNavSide)
    }
  }, [])

  return (
    <Navigation ref={navRef}>
      <Ul ref={ulRef}>
        {nav.map((item, index) => (
          <li key={index}>
            <NavLink href={item.link}>{item.title}</NavLink>
          </li>
        ))}
      </Ul>
    </Navigation>
  )
}

const Navigation = styled.nav`
  padding: 0 2rem;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ddd;
  position: relative;

  @media (min-width: 768px) {
    > ul > li:nth-child(3) {
      position: relative;
      display: flex;
      align-items: center;

      :after {
        content: '';
        display: block;
        position: absolute;
        right: -1.5rem;

        width: 1px;
        height: 3.2rem;

        border-right: 1px solid #ddd;
        background-color: #ddd;
      }
    }
  }
`

const Ul = styled.ul`
  display: flex;
  align-items: center;
  gap: 3rem;

  overflow-x: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  &.left-blur {
    ::before {
      content: '';
      width: 150px;
      height: 52px;
      position: absolute;
      background: linear-gradient(270deg, #fff0 0, #fff 90%, white);
      left: 0;
    }
  }

  &.right-blur {
    ::after {
      content: '';
      width: 150px;
      height: 52px;
      position: absolute;
      background: linear-gradient(90deg, #fff0 0, #fff 90%, white);
      right: 0;
    }
  }

  @media (min-width: 768px) {
    & > li:nth-child(3) {
      position: relative;
      display: flex;
      align-items: center;

      :after {
        content: '';
        display: block;
        position: absolute;
        right: -1.5rem;

        width: 1px;
        height: 3.2rem;

        border-right: 1px solid #ddd;
        background-color: #ddd;
      }
    }
  }
`

export default NavBar
