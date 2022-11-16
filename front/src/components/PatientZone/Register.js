import React, { useState, useEffect } from 'react'
import '../CSS/Login.css';
import Loader from '../Loader'
import Message from '../Message'
import Navbar from '../Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { registerUser } from '../../actions/userActions';
const Register = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cin, setCIN] = useState('')
  const [name, setName] = useState('')
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo, loading, error } = userLogin
  useEffect(() => {
    if (userInfo) {
      navigate('/')
    }
  }, [navigate, userInfo])
  const onSubmit = e => {
    e.preventDefault()
    dispatch(registerUser({email, password,name,cin}))
  }
  return (
    <section id="main">
      <Navbar/>
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
                  type='text'
                  name='name'
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder='Entrer Votre Nom'
                />
                    <label>Name</label>
                  </div>
              <div class="user-box">
              <input
              type='email'
              name='email'
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder='Entrer Votre Email'
            />
                <label>Email</label>
              </div>
              <div class="user-box">
              <input
              type='password'
              name='password'
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder='Entrer Votre password'
            />
                <label>Password</label>
              </div>
                <div class="user-box">
                <input
                type='text'
                name='CIN'
                value={cin}
                onChange={e => setCIN(e.target.value)}
                placeholder='Entrer Votre CIN'
              />
                  <label>CIN</label>
                </div>
              <button type='submit' class='btn btn-primary btn-block'>Register</button>
            </form>
          </div>
        </div>
        <div class="card-image-pat">
        </div>
      </div>
  </section>
  )
}

export default Register;
