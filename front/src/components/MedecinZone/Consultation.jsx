import {React,useEffect,useState} from 'react'
import { useForm } from 'react-hook-form';
import { Card } from 'react-bootstrap';
import { useLocation } from "react-router-dom"
import Header from '../Header';
import '../CSS/ficheAdd.css';
import {useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux';

function FichePatient() {
    const location = useLocation();
    const Pid = location.search.slice(5);
    const navigate = useNavigate()
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    useEffect(() => {
        if (!userInfo) {
        navigate('/SecretaryZone/login')
        }
    }, [userInfo, navigate])
    const { register, handleSubmit, formState: { errors },reset} = useForm();
    const onSubmit = (data) => {
        data.Pid = Pid;
        console.log(JSON.stringify(data));
        var obj = {
            method: 'post',
            headers: {
              'Authorization': 'Bearer '+userInfo?.jwt, 
            },
            body:JSON.stringify(data)
          }
          fetch("http://127.0.0.1/E-DOc/api/Medecin/addConsultation.php",obj)
          .then(res=>res.json())
          .then((res)=>{
            window.confirm("Consultation enregistrée avec Succés");
            navigate('/MedecinZone/Accueil')
          })
};
  return (
    <div className="formFiche">
        <Header/>
        <div className="mb-3">
            <Card style={{ margin:"4% auto",width:"60%",border: "2px solid black", boxShadow: "5px 5px 10px lightGray",backgroundColor:"#FBEEC1" }}>
                <Card.Body>
                    <h5 style={{textAlign:"center",marginBottom:"45px",color:"green"}}>Consultation</h5>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <label for="exampleInputEmail1" class="form-label">Date de Consultation</label>
                        <div style={{width:"100%"}}>
                        <input className="form-control" type="date" placeholder="Date de Naissance" {...register('DateConsultation',{ required: true })} />
                        </div>
                        <br />
                        <label for="exampleInputEmail1" class="form-label">Motif De Consultation</label>
                        <div style={{width:"100%"}}>
                            <input type="text" className="form-control" placeholder="Numéro de téléphone" {...register('Motif', { required: true,maxLength:22 })}  />
                        </div>
                        <br />
                        <label for="exampleInputEmail1" class="form-label">Diagnostic</label>
                        <div style={{width:"100%"}}>
                        <textarea className="form-control" placeholder="Type d'assurance"  {...register('Diagnostic',{ required: true })} />
                        </div>
                        <br />
                        <label for="exampleInputEmail1" class="form-label">examen clinique</label>
                        <div style={{width:"100%"}}>
                        <textarea className="form-control" placeholder="Groupe Sanguin" {...register('ExamenClinique',{ required: true })} />
                        </div>
                        <br />
                        <label for="exampleInputEmail1" class="form-label">examens de laboratoire</label>
                        <div style={{width:"100%"}}>
                        <textarea className="form-control" placeholder="Groupe Sanguin" {...register('ExamenLabo',{ required: true })} />
                        </div>
                        <br />
                        <label for="exampleInputEmail1" class="form-label">Prescription d'un traitement</label>
                        <div style={{width:"100%"}}>
                        <textarea className="form-control" placeholder="Groupe Sanguin" {...register('Prescription',{ required: true })} />
                        </div>
                        <br />
                        <button type="submit" style={{marginRight:"10px"}} class="btn btn-primary">Ajouter</button>
                        </form>
                </Card.Body>
            </Card> 
        </div>   
    </div>
  )
}

export default FichePatient;