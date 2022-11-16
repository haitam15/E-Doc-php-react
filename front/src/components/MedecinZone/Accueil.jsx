import React , { useEffect } from 'react'
import SideBarMed from '../sideBarMed';
import '../CSS/dashbord.css';
import {useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux';


const Dashbord = () => {
    const navigate = useNavigate()
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    useEffect(() => {
        if (!userInfo) {
        navigate('/SecretaryZone/login')
        }
    }, [userInfo, navigate])
    return (
        <div className="Dashbord">
            < SideBarMed />
            <div className="DashbordContent">
                <div className="DashTitle">
                    <h1>Tableau de Bord</h1>
                </div>
                <div className="Hello">
                    <div className="helloText">
                        <h2><span>Bonjour,</span> Médecin {userInfo?.Name}</h2>
                        <div className="line"></div>
                    </div>
                    <div className="cardsInfo">
                        <div className="Card">
                            <div className="CArdNumber">
                                <p>9</p>
                            </div>
                            <div className="CardTitle">
                                <h2>Rendez-vous en Attente</h2>
                            </div>
                        </div>
                        <div className="Card">
                            <div className="CArdNumber">
                                <p>9</p>
                            </div>
                            <div className="CardTitle">
                                <h2>Rendez-vous confirmés</h2>
                            </div>
                        </div>
                        <div className="Card">
                            <div className="CArdNumber">
                                <p>9</p>
                            </div>
                            <div className="CardTitle">
                                <h2>Rendez-vous en Terminés</h2>
                            </div>
                        </div>
                        <div className="Card">
                            <div className="CArdNumber">
                                <p>9</p>
                            </div>
                            <div className="CardTitle">
                                <h2>Total des patients</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        
    )
}

export default Dashbord;
