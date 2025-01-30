import React from 'react'

const Input = ({value, onChange, type, id, placeholder}) => {
  return (
    <>
        <input
            type={type}
            id={id}
            className="mt-1 p-3 border rounded w-full placeholder-color_3 border-color_4/30 text-lg"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
    </>
  )
}

export default Input
