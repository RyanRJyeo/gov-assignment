import React from 'react'

interface TextInputProps {
  name: string
  value?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const TextInput: React.FC<TextInputProps> = (props) => {
  const { name, value, onChange } = props

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (typeof onChange === 'function') onChange(event)
  }

  return (
    <>
      <input
        type="text"
        name={name}
        value={value}
        onChange={(event) => handleOnChange(event)}
      />
    </>
  )
}

export default TextInput
