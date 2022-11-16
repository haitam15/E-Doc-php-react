import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
const Home = () => {
  const navigate = useNavigate()
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    }
  }, [userInfo, navigate])
  return (
    <div id='login'>
      <div className='container'>
        <h1 className='l-heading'>
          Welcome <span class='text-primary'>{userInfo && userInfo.email}</span>
        </h1>
      </div>
    </div>
  )
}

export default Home
