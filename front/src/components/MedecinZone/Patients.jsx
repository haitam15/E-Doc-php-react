import {React,useState,useEffect} from 'react';
import {useNavigate,Link} from 'react-router-dom';
import { useSelector } from 'react-redux';
import SideBarMed from '../sideBarMed';
import '../CSS/CardList.css';
import { FcSearch } from "react-icons/fc";
import {BsPlusCircleFill} from "react-icons/bs";
import { FcDocument } from "react-icons/fc";
import {BsPrinter} from "react-icons/bs";
import '../CSS/listPatient.css';
function Patients() {
    const [patients,setItem] = useState([]);
    const navigate = useNavigate()
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    useEffect(() => {
      if (!userInfo) {
      navigate('/')
      }
  }, [userInfo, navigate])

  const serachPatient = (evt)=>{
    let arr= [];
    const cin  = evt.target.value;
    var obj = {
      method: "post",
      headers: {
        'Authorization': 'Bearer '+userInfo?.jwt, 
      },
      body:JSON.stringify({cin})
    }
    if(cin !== ""){
        fetch("http://127.0.0.1/E-DOC/api/findPatient.php",obj)
        .then(res => res.json())
        .then(
            (res) =>{
                arr.push(res);
                console.log(arr);
                setItem(arr);
            }
        )
      }else{
        obj = {
          headers: {
            'Authorization': 'Bearer '+userInfo?.jwt, 
          },
        }
        fetch("http://127.0.0.1/E-DOC/api/Secretaire/listePatients.php",obj)
        .then(res => res.json())
        .then(
            (res) =>{
                setItem(res);
            }
        )
      }
    }
      

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
        }
    )
},[])

  return(
    <div>
      < SideBarMed />
        <div className="listPatient" >
            <div className="row">
            <div className="d_flex my-4, text-uppercase">
                  <h1 style={{textAlign: 'center',marginTop:"40px"}}>Liste Des Patients</h1>
              </div>
              <div className="Search-bar">
                  <FcSearch className="search-icon"/>
                  <input type="search" className="search" onChange={serachPatient} placeholder="Chercher Un patient Par CIN"></input>
              </div>
              <table className="table table-bordered">
                  <thead className="thead-dark">
                      <tr>
                          <th>Name</th>
                          <th>CIN</th>
                          <th>email</th>
                          <th>ajouter Une Consultaion</th>
                          <th>Consulter Dossier Medical</th>
                          <th>Imprimer Un Document</th>
                      </tr>
                  </thead>
                  <tbody>
                      {
                          Object.keys(patients).map(key =>(
                              <tr key={patients[key].Pid}>
                                  <td>{patients[key].name}</td>
                                  <td>{patients[key].cin}</td>
                                  <td>{patients[key].email}</td>
                                  <td><button type="button" class="btn btn-success"><Link to={{ pathname: `/MedecinZone/Consultation?Pid=${patients[key].PID}`, state: { Pid: 'bar'} }} style={{color:"#FFF"}} ><BsPlusCircleFill/> Consultation</Link></button></td>
                                  <td><button type="button" class="btn btn-primary"><FcDocument/>  Dossier médical</button></td>
                                  <td><button type="button" class="btn btn-primary"><BsPrinter/></button></td>
                              </tr>
                          ))
                      }
                  </tbody>
              </table>
            </div>
          </div>
      </div>
  )
}

export default Patients;
