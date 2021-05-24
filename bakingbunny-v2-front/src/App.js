import React, { useState, useEffect, useRef } from 'react'
import './App.css';

import loginService from '../service/login'
import tokenService from '../service/testToken'

import Togglable from '../component/Togglable'

const App = () => {

  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')   
  const [password, setPassword] = useState('') 
  const [user, setUser] = userState(null)

  const [loginVisible, setLoginVisible] = useState(false)

  const loginFormRef = useRef()

  useEffect(() => {

  }, [])

  useEffect(() => {

    const loggedUserJSON = window.localStorage.getItem('loggedAppUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      tokenService.setToken(user.token)
    }

  }, []) //empty array ensures that this effect should be executed only when the component is rendered for the first time.


  const handleLogin = (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedAppUser', JSON.stringify(user)
      )
      //security issue of XSS(cross site scripting)
      /*
      When using React in a sensible manner it should not be possible since React sanitizes all text that it renders, meaning that it is not executing the rendered content as JavaScript.
      */
      tokenService.setToken(user.token)
      
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong Credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedAppUser')
    window.localStorage.clear()
  }

  const loginForm = () => {

    const hideWhenVisible = { display : loginVisible ? 'none': ''}
    const showWhenVisible = { display : loginVisible ? '': 'none'}

    loginFormRef.current.toggleVisibility() //way to use ref

    return (
    <div>
      <h1>Login Test</h1>
      
      <Notification message={errorMessage} />
      
      <form onSubmit={handleLogin}>
        <div>
          username
          <input type="text" value={username} name="username" onChange={({target}) => setUsername(target.value)}/>
        </div>
        <div>
          password
          <input type="text" value={password} name="password" onChange={({target}) => setPassword(target.value)}/>
        </div>
        <button type="submit">login</button>
      </form>

    </div>)
  }

  const afterLoginForm = () => {
    
    return (
    <div>
    <h1>Logged in</h1>
    
    <button type="button" onClick={() => handleLogout()}>logout</button>
    </div> )
  }

  return (
    <div>
      <h1>Baking bunny</h1>
    
    <div style={hideWhenVisible}>
      <Togglable ref={loginFormRef}>
        <loginForm
          username = {username}
          />
      </Togglable>
    </div>

    {
      user === null ?
      loginForm :
      afterLoginForm
    }
    
    </div>
  )
 }

export default App;
