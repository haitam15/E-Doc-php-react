import React , { useState ,useEffect  } from 'react';
import Calendar from 'react-calendar';
import AsideBar from '../asideBar';
import RdvCard from '../RdvCard';
import {useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux';
import '../CSS/Calendar.css';
import '../CSS/Appointment.css';

function Appointment() {
    const navigate = useNavigate()
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    console.log(new Date(userInfo.expireAt))
    useEffect(() => {
        if (!userInfo) {
        navigate('/SecretaryZone/login')
        }
    }, [userInfo, navigate])
    const [startDate, setStartDate] = useState(new Date());
    const [RdvData, setRdvData] = useState([]);
    const months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Decembre"]
    const day = startDate.getDate();
    const month = months[startDate.getMonth()];
    let month1 = startDate.getMonth()+1;
    if(month1 < 10){
        month1 ='0'+month1;
    }
    const year = startDate.getFullYear();
    const fullDate = day + " " + month + " " + year;
    const fullDate1 = year + "/" + month1 + "/" + day;

    const addDuree = (time,duree)=>{
        const words = time.split(":");
        let hh = parseInt(words[0]);
        let mm = parseInt(words[1]);
    
        hh += parseInt(duree / 60);
        duree %= 60;
        mm += parseInt(duree);
        if( mm >= 60){
            hh += 1;
            mm = mm % 60;
        }
        if( mm === 0)  
            mm = '00'
        if(hh < 10)
            hh = `0${hh}`;
        let rdv = `${hh}:${mm}`;
        return rdv;
    }

    const makeRdvData = (data)=>{
        console.log(data?.M?.dispo);
        let Rdv = [];
        let dispoM = data?.M?.dispo;
        let dsipoS = data?.S?.dispo;
        console.log(dsipoS);
        let duree = data?.D;
        let debutM = data?.M?.heure;
        let debutS = data?.S?.heure;
        let dispo = [];
        //ajouter les Rendez-Vous du matin
        for(let i=0; i<dispoM?.length; i++){
            dispo.push(addDuree(debutM,dispoM[i]*duree));
            Rdv.push({
                "M_S":'M',
                "ordre":dispoM[i] + 1,
                "key":i+1,
                "time":addDuree(debutM,dispoM[i]*duree)
            })
        }
        //ajouter les Rendez-Vous du Soir
        for(let i=0; i<dsipoS?.length; i++){
            dispo.push(addDuree(debutS,dsipoS[i]*duree));
            Rdv.push({
                "M_S":'S',
                "ordre":dsipoS[i] + 1,
                "key":i + dispoM.length + 1 ,
                "time":addDuree(debutS,dsipoS[i]*duree)
            })
        }
        setRdvData(Rdv);
        console.log(Rdv);
    }

    const changeDate = (date)=>{
        let dd = date.getDate();
        let mm = date.getMonth()+1;
        let yy = date.getFullYear();
        let fullDate = `${yy}/${mm}/${dd}`;
        setStartDate(date);
        const body = {"day":fullDate , "orderDay":1};
        fetch("http://127.0.0.1/E-DOC/api/listeREndezVous.php", {
            method: "post",
            headers: { 
                "Authorization":'Bearer '+userInfo?.jwt,
            },
            body: JSON.stringify(body)
        },{headers: {authorization :`Bearer ${userInfo?.jwt}`}})
            .then(res => res.json())
            .then(data => {
                makeRdvData(data);
            })
    }

    return (
        <div className="appointment">
            <AsideBar/>
            <div className="mainAppointment">
                <div className="appointmentText">
                    <h1>Rendez-Vous</h1>
                    <div>
                        <div>
                            <Calendar
                            className="calender"
                            selected={startDate}
                            onChange={date => changeDate(date)}
                            />
                        </div>
                    </div>
                </div>
                {RdvData.length>0 && <div className="available">
                    <h3>Les Rendez-vous Disponibles en {fullDate}</h3>
                </div>}
                <div className="container">
                <div className="row">
                    {
                        RdvData.map(app => <RdvCard
                            ordre={app.ordre}
                            token = {userInfo?.jwt}
                            M_S = {app.M_S}
                            key={app.key}
                            appointmentData={app}
                            fullDate1={fullDate1}
                        ></RdvCard>)
                    }
                </div>
                </div>
            </div>
        </div>
    )
}

export default Appointment;
