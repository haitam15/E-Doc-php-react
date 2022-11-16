import React, { useState, useEffect } from 'react'
import '../CSS/Login.css';
import Loader from '../Loader'
import Message from '../Message'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../../actions/medecinActions'
const LoginM = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo, loading, error } = userLogin
  console.log(userInfo);
  useEffect(() => {
    if (userInfo) {
      navigate('/MedecinZone/Accueil')
    }
  }, [navigate, userInfo])
  const onSubmit = e => {
    e.preventDefault()
    dispatch(loginUser(email, password))
  }
  return (
    <section id="main">
    <h3 class="title">Bienvenue Dans
      <span class="special-word"> E-Doc</span></h3>
      <div class="card">
        <div class="card-side">
          <h3 class="title">Conectez-<span class="special-word">Vous</span>
          </h3>
          <div class="login-box">
          {error && <Message>{error}</Message>}
          {loading && <Loader />}
            <form  onSubmit={onSubmit}>
              <div class="user-box">
              <input
              type='email'
              name='email'
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder='Enter Email'
            />
                <label>Email</label>
              </div>
              <div class="user-box">
              <input
              type='password'
              name='password'
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder='Enter password'
            />
                <label>Mot de passe</label>
              </div>
              <button type='submit' class='btn btn-primary btn-block'>Login</button>
            </form>
          </div>
        </div>
        <div class="card-image-doc">
        </div>
      </div>
  </section>
  )
}

export default LoginM;
