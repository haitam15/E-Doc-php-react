import React , { useState,useEffect} from 'react'
import AsideBar from '../asideBar';
import {useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux';
import CardList from '../CardList';
import '../CSS/listPatient.css';


function ListPatient() {
    const navigate = useNavigate()
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const [item,setItem] = useState([]);
    useEffect(() => {
        var obj = {
            headers: {
              'Authorization': 'Bearer '+userInfo?.jwt, 
            },
          }
        fetch("http://127.0.0.1/E-DOC/api/Secretaire/listePatients.php",obj)
        .then(res => res.json())
        .then(
            (res) =>{
                setItem(res);
                console.log(res);
            }
        )
    },[])
    useEffect(() => {
        if (!userInfo) {
        navigate('/')
        }
    }, [userInfo, navigate])
    return (
        <div>
            < AsideBar />
            <div className="listPatient"><CardList patients={item}/></div>
        </div>
    )
}

export default ListPatient
