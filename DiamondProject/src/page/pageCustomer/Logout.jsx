import React from 'react'
import { Button } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

export const Logout = () => {
    const handleLogOut = ()=>{
        localStorage.clear()
    }
  return (
    <Button as={NavLink} to='/login' onClick={handleLogOut}>
        Log out
    </Button>
  )
}
