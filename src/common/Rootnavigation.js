import React from 'react'
import { BrowserRouter, Route, Router } from 'react-router-dom'
import Login from '../pages/Login'

const Rootnavigation = () => {
  return (
    <>
            <Router>
                <Route path='/' element={< Login/> }/>
                {/* <Route path='' element={< Login/> }/> */}
            </Router>

    </>
  )
}

export default Rootnavigation