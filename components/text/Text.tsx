import React from 'react'

import styled from '@emotion/styled'

interface Props extends React.HTMLAttributes<HTMLSpanElement> {}

const Text = (props: Props) => {
  return <BaseText {...props} />
}

const BaseText = styled.span`
  align-items: center;
  display: flex;
  font-size: 1.4rem;
  font-weight: 500;
  color: #767676;
`

export default Text
