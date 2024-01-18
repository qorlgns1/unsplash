import React from 'react'

import Link from 'next/link'

import styled from '@emotion/styled'

import LogoIcon from '@/components/icon/LogoIcon'

const Logo = () => {
  return (
    <Link href="/" className="flex gap-4">
      <LogoIcon />
      <LogoTitle>Unsplash</LogoTitle>
    </Link>
  )
}

const LogoTitle = styled.span`
  font-size: 2rem;
  font-weight: 600;
`

export default Logo
