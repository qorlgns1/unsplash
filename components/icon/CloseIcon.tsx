import React from 'react'

import styled from '@emotion/styled'

import Icon from '@/assets/icons/close.svg'

const CloseIcon = () => {
  return <StyledIcon className="inline-block" />
}

const StyledIcon = styled(Icon)`
  padding: 0.8rem;

  width: 3.2rem;
  height: 3.2rem;

  :hover {
    color: #000;
    opacity: 0.75;
  }
`

export default CloseIcon
