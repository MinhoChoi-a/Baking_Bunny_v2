import React, { useState, useEffect, useRef } from 'react'
import { createStore, combineReducers } from 'redux'

import './App.css';

import loginService from '../service/login'
import tokenService from '../service/testToken'

import Togglable from '../component/Togglable'

import reducer, { initializeNotes } from './reducers/reducer' //defines impact of action to the state of the application
import filterReducer from './reducers/filterReducer';

//useselector?? react-redux hook => maps state to props
//usedispatch?? react-reudx hook => maps props to state
//newer version of connect fuction
//FYI, connect(mapStateToProps:selector, mapDispatchToProps:dispatch) (component)
//mapStateToProps: doesn't neet get whole state / nullable
//mapDispatchToProps: manage action as a prop / nullable

const reduc = combineReducers({
  notes: reducer,
  filter: filterReducer
})

const store = createStore(reduc)
//dispatch => send action to the store
//getState => get current state
//subscribe => can make callback functino when store's state is changed


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

  }, []) 
  //dependency array
  //empty array ensures that this effect should be executed only when the component is rendered for the first time.
  //if I put 'user', then this useEffect will be working when user data is updated only.


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
/*
<Router>
<div>
  <Link style={padding} to="/">home</Link>
  <Link style={padding} to="/notes">notes</Link>
  <Link style={padding} to="/users">users</Link>
</div>

//the order of path is important, the first matched one will be rendered

<Switch>
  <Route path="/notes/:id"> => can use parameter with useParam(). method in the child component. Otherwise, we can use useRouteMatch('/notes/:id') hook
    <Notes />
  </Route>
  <Route path="/users">
    <Users />
  </Route>
  <Route path="/">
    <Home />
  </Route>
</Switch>

<div>
  <i>Note app, Department of Computer Science 2021</i>
</div>
</Router>*/



  )
 }

export default App;
