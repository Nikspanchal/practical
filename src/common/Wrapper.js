import React from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'

const Wrapper = () => {
    const navigate = useNavigate()
    
    const login =  JSON.parse(localStorage.getItem('login'))
    console.log("login:", login)
    if (login) {
        return <Outlet />
    }
    else if (!login){
        navigate('/')
    }
}

export default Wrapper