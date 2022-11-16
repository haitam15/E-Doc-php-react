import {React,useState,useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux';
import SideBarMed from '../sideBarMed';

function DossMedic(patient) {
  const navigate = useNavigate()
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    useEffect(() => {
      if (!userInfo) {
      navigate('/')
      }
  }, [userInfo, navigate])
  return(
    <div className="kk">
      < SideBarMed />
    </div>
  )
}

export default DossMedic;
