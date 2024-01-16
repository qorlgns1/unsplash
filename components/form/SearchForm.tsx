import React, { type RefObject } from 'react'

import styled from '@emotion/styled'

import SearchIcon from '@/components/icon/SearchIcon'

interface Props {
  formProps?: React.FormHTMLAttributes<HTMLFormElement>
  inputProps?: React.InputHTMLAttributes<HTMLInputElement> & {
    ref?: RefObject<HTMLInputElement>
  }
}

const SearchForm = ({ formProps, inputProps }: Props) => {
  return (
    <Form {...formProps}>
      <Label>
        <Input {...inputProps} />
      </Label>
      <button>
        <SearchIcon />
      </button>
    </Form>
  )
}

const Form = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 4rem;
  background-color: white;
  border-radius: 10px;
`

const Label = styled.label`
  flex-grow: 1;
  height: 100%;
`

const Input = styled.input`
  width: 100%;
  height: 100%;
  outline: none;
`

export default SearchForm
