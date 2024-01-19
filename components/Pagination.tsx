import React, { useMemo } from 'react'

import styled from '@emotion/styled'

import Button from '@/components/button/Button'

interface Props {
  currentPage: number
  totalPages: number
  range: number
  onPageChange: (page: number) => void
  className?: string
}

const Pagination = ({ className, currentPage, totalPages, range, onPageChange }: Props) => {
  const previousPage = currentPage - 1
  const nextPage = currentPage + 1

  const makePageInfo = (label: string, pageNum: number) => ({ label, pageNum })

  const renderpageInfo = (currentPage: number, totalPages: number, range: number) => {
    const stratPageInRange = Math.max(1, currentPage - range)
    const lastPageInRange = currentPage + range
    const pageInfo =
      stratPageInRange <= 1 ? [] : [makePageInfo('1', 1), makePageInfo('...', stratPageInRange - 1)]

    for (let i = stratPageInRange; i <= currentPage; i++) {
      pageInfo.push(makePageInfo(i.toString(), i))
    }

    if (lastPageInRange > totalPages) {
      for (let i = nextPage; i <= totalPages; i++) {
        pageInfo.push(makePageInfo(i.toString(), i))
      }
    } else {
      for (let i = nextPage; i <= lastPageInRange; i++) {
        pageInfo.push(makePageInfo(i.toString(), i))
      }
      pageInfo.push(makePageInfo('...', lastPageInRange + 1))
      pageInfo.push(makePageInfo(totalPages.toString(), totalPages))
    }

    return pageInfo
  }

  const pageInfo = useMemo(() => {
    return renderpageInfo(currentPage, totalPages, range)
  }, [currentPage, range, totalPages])

  return (
    <Ul className={className}>
      <li onClick={() => onPageChange(previousPage)}>
        <StyledButton current={false} disabled={currentPage === 1}>
          {'<'}
        </StyledButton>
      </li>
      {pageInfo.map(({ label, pageNum }, index) => {
        return (
          <li key={`${pageNum} ${index}`} onClick={() => onPageChange(pageNum)}>
            <StyledButton current={pageNum === currentPage}>{label}</StyledButton>
          </li>
        )
      })}
      <li onClick={() => onPageChange(nextPage)}>
        <StyledButton current={false} disabled={totalPages === currentPage}>
          {'>'}
        </StyledButton>
      </li>
    </Ul>
  )
}

const Ul = styled.ul`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`

const StyledButton = styled(Button)<{ current: boolean }>`
  padding: 0.5rem 1.1rem;
  background-color: ${({ current }) => !current && '#fff'};

  :disabled {
    opacity: 0.3;
  }
`

export default Pagination
