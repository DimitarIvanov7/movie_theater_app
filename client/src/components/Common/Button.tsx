import React from 'react'

interface PropTypes {
  onClick: () => void
  label:string
  type:string
}

const Button = ({onClick, label, type}:PropTypes) => {
  return (
    <div onClick={onClick} className=''>{label}</div>
  )
}

export default Button