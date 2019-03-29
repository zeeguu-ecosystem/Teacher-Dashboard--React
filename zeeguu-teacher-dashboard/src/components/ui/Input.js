import React from 'react'

const Input = ({ label, value, setValue, ...props }) => {
  return (
    <>
      <label>{label}</label>
      <input
        value={value}
        onChange={e => setValue(e.target.value)}
        {...props}
      />
    </>
  )
}

export default Input
