import React , { useEffect } from 'react'
import AsideBar from '../asideBar';
import {useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux';
import RDVlist from '../RDVlist';
import '../CSS/listPatient.css';


function ListRdv() {
    const navigate = useNavigate()
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    useEffect(() => {
        if (!userInfo) {
        navigate('/')
        }
    }, [userInfo, navigate])
    return (
        <div>
            < AsideBar />
            <div className="listPatient"><RDVlist/></div>
        </div>
    )
}

export default ListRdv;
