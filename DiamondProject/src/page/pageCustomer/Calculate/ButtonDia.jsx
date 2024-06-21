import React from 'react'
import { Button } from 'react-bootstrap'
export const ButtonDia = (props) => {
  return (
    
      <Button className='mx-3' value={props.name} onClick={props.onClick} >{props.name}</Button>
   
  )
}
