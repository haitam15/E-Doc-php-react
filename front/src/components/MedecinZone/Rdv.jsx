import React , { useEffect } from 'react'
import SideBarMed from '../sideBarMed';
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
            < SideBarMed />
            <div className="listPatient"><RDVlist/></div>
        </div>
    )
}

export default ListRdv;
