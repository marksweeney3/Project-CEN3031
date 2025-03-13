import React from 'react'
import './Login.css'

const Login = () => {
  return (
    <div className='Container'>
      <div className="header">
        <div className="text"> Sign Up </div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input">
          <input type="text" placeholder="Email"/>
        </div>
        <div className="input">
          <input type="text" placeholder="Password"/> 
        </div>
        </div>
        <div className= "SubmitContainer">
          <div className="submit">SignUp</div>
          <div className="submit">Login</div>
      </div>
    </div>
  )
}

export default Login