import { createContext, useReducer } from 'react'

export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'


const initialState = {
  isAuthenticate: Boolean(localStorage.getItem('token')),
  user: localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : {
      _id: null
    }
}

const AuthContext = createContext({
  isAuthenticate: false,
  user: {
    _id: null
  },
  login: () => null,
  logout: () => null
})

const authReducer = (state, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isAuthenticate: true,
        user: action.payload
      }
    case LOGOUT:
      return {
        ...state,
        isAuthenticate: false,
        user: {
          _id: null
        }
      }
    default:
      return state
  }
}

const AuthProvider = (props) => {
  const [state, dispatch] = useReducer(authReducer, initialState)

  const login = (data) => {
    localStorage.setItem('token', data.accessToken)
    localStorage.setItem('user', JSON.stringify(data))
    dispatch({ type: LOGIN, payload: data })
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    dispatch({ type: LOGOUT })
  }

  return <AuthContext.Provider value={{ isAuthenticate: state.isAuthenticate, user: state.user, login, logout }} {...props} />
}

export { AuthProvider, AuthContext }