import {React,useState} from 'react';
import './CSS/CardList.css';
import { FcSearch } from "react-icons/fc";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'


function CardList({patients}) {
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const [pat,setItem] = useState([]);
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
                    res.PID = res.Pid;
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
    return (
        <div className="row" >
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
                        <th>Fiche Patient</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Object.keys(pat).map(key =>(
                            <tr key={pat[key].PID}>
                                <td>{pat[key].name}</td>
                                <td>{pat[key].cin}</td>
                                <td>{pat[key].email}</td>
                                <td><button type="button" class="btn btn-success" ><Link to={{ pathname: `/secretaryZone/AddFiche?Pid=${pat[key].PID}`, state: { Pid: 'bar'} }} style={{color:"#FFF"}} >Ajouter/Modifier</Link></button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default CardList;
