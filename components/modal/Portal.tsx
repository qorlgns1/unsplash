import { createPortal } from 'react-dom'

import styled from '@emotion/styled'

interface Props {
  children: React.ReactNode
}

const Portal = ({ children }: Props) => {
  return createPortal(
    <ModalWrapper>{children}</ModalWrapper>,
    document.getElementById('modal') as HTMLElement
  )
}

const ModalWrapper = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  overflow: auto;
  outline: 0;
`

export default Portal
