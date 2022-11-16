import axios from 'axios'
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
} from '../constants/userConstants'
export const loginUser = (email, password) => async dispatch => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST })
    const config = {
      headers: {
        'content-type': 'application/json',
      },
    }
    const { data } = await axios.post('http://127.0.0.1/E-DOC/api/Patient/login.php', { email, password }, config)
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data })
    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (err) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    })
  }
}
export const registerUser = body => async dispatch => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST })
    const config = {
      headers: {
        'content-type': 'application/json',
      },
    }
    const { data } = await axios.post('http://127.0.0.1/E-DOC/api/Patient/register.php',body, config)
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data })
    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (err) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    })
  }
}

export const logout = () => async dispatch => {
  dispatch({ type: USER_LOGOUT })
  localStorage.removeItem('userInfo')
}
