import React from 'react'

import Link from 'next/link'

import styled from '@emotion/styled'

import Text from '@/components//text/Text'
import Button from '@/components/button/Button'
import HartIcon from '@/components/icon/HartIcon'
import Flex from '@/components/layout/Flex'
import Logo from '@/components/logo/Logo'

interface Props {
  children: React.ReactNode
}

const Header = ({ children }: Props) => {
  return (
    <>
      <header className="p-8">
        <Flex justify="space-between" wrap="wrap" gap="2rem">
          <LeftSection>
            <Logo />
          </LeftSection>
          <RightSection gap="1rem" wrap="wrap">
            <Buttons gap="1rem">
              <Button>사진 제출</Button>
              <Link href="/bookmark/like">
                <HartIconButton className="h-full" hasBorder={true}>
                  <span>북마크</span>
                  <HartIcon />
                </HartIconButton>
              </Link>
            </Buttons>
            <UserInfo align="center" gap="0.5rem">
              <Text>qorlgns1</Text>
              <Text>|</Text>
              <Text>rlgns0610@gmail.com</Text>
            </UserInfo>
          </RightSection>
        </Flex>
      </header>
      <div>{children}</div>
    </>
  )
}

const LeftSection = styled(Flex)``
const RightSection = styled(Flex)``

const Buttons = styled(Flex)``
const UserInfo = styled(Flex)``

const HartIconButton = styled(Button)`
  svg > path {
    stroke: #6e7888;
  }

  :hover {
    svg > path {
      stroke: black;
    }
  }
`

export default Header
