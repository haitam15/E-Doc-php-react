import {React,useEffect,useState} from 'react'
import { useForm } from 'react-hook-form';
import { Card } from 'react-bootstrap';
import { useLocation } from "react-router-dom"
import Header from '../Header';
import '../CSS/ficheAdd.css';
import {useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux';

function FichePatient() {
    const [fiche,setFiche] = useState();
    const [update,setUpdate] = useState(false);
    const [btn1, setBtn1] = useState(false);
    const location = useLocation();
    const Pid = location.search.slice(5);
    const navigate = useNavigate()
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    useEffect(() =>{
        const data = {Pid}
        let obj = {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + userInfo?.jwt,
            },
            body: JSON.stringify(data)
        }
        fetch("http://127.0.0.1/E-DOC/api/Secretaire/getFiche.php",obj)
        .then(res => res.json())
        .then(
            (res)=>{
                setUpdate(true);
                setFiche(res);
            } 
        )
    },[])
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
        btn1===true?
        fetch("http://127.0.0.1/E-DOC/api/Secretaire/addFiche.php",obj)
        .then(res => res.json())
        .then(
            (res)=>{console.log(res);
                window.confirm("Fiche Ajoutée avec Succés");
                navigate('/SecretaryZone/listePatients')
            }
        ):
        fetch("http://127.0.0.1/E-DOC/api/Secretaire/modifierFiche.php",obj)
        .then(res => res.json())
        .then(
            (res)=>{console.log(res);
                window.confirm("Fiche Modifiée avec Succés");
                navigate('/SecretaryZone/listePatients')
            }
        );
};
  return (
    <div className="formFiche">
        <Header/>
        <div className="mb-3">
            <Card style={{ margin:"4% auto",width:"60%",border: "2px solid black", boxShadow: "5px 5px 10px lightGray",backgroundColor:"#FBEEC1" }}>
                <Card.Body>
                    <h5 style={{textAlign:"center",marginBottom:"45px",color:"green"}}>Ajouter Fiche Patient</h5>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <label for="exampleInputEmail1" class="form-label">Date de naissance</label>
                        <div style={{width:"100%"}} onChange={(e) => setFiche({...fiche,dateNaissance:e.target.value})}>
                        <input className="form-control" value={fiche?.dateNaissance} type="date" placeholder="Date de Naissance" {...register('dateNaissance',{ required: true })} />
                        </div>
                        <br />
                        <label for="exampleInputEmail1" class="form-label">Numéro de téléphone</label>
                        <div style={{width:"100%"}} onChange={(e) => setFiche({...fiche,tlfn:e.target.value})}>
                            <input type="text" className="form-control" value={fiche?.tlfn} placeholder="Numéro de téléphone" {...register('tlfn', { required: true,maxLength:22 })}  />
                        </div>
                        <br />
                        <label for="exampleInputEmail1" class="form-label">Poids</label>
                        <div style={{width:"100%"}} onChange={(e) => setFiche({...fiche,poids:e.target.value})}>
                        <input className="form-control" value={fiche?.poids} placeholder="Poids" {...register('poids',)} />
                        </div>
                        <br />
                        <label for="exampleInputEmail1" class="form-label">Type d'assurance</label>
                        <div style={{width:"100%"}} onChange={(e) => setFiche({...fiche,assurance:e.target.value})}>
                        <input className="form-control" value={fiche?.assurance} placeholder="Type d'assurance"  {...register('assurance',{ required: true })} />
                        </div>
                        <br />
                        <label for="exampleInputEmail1" class="form-label">Groupe Sanguin</label>
                        <div style={{width:"100%"}} onChange={(e) => setFiche({...fiche,grpSanguin:e.target.value})}>
                        <input className="form-control" value={fiche?.grpSanguin} placeholder="Groupe Sanguin" {...register('grpSanguin',{ required: true })} />
                        </div>
                        <br />
                        <label for="exampleInputEmail1" class="form-label">Sexe</label>
                            <select className="form-select" {...register('sexe',{ required: true })} name="M_S" >
                                <option value="Homme">Homme</option>
                                <option value="Femme">Femme</option>
                            </select>
                        <br />
                        <label for="exampleInputEmail1" class="form-label">Adresse</label>
                        <div style={{width:"100%"}} onChange={(e) => setFiche({...fiche,adresse:e.target.value})}>
                        <input  className="form-control" value={fiche?.adresse} placeholder="Adresse" {...register('adresse',{ required: true })} />
                        </div>
                        <br />
                        <div style={{display: 'flex', flexDirection: 'row'}}>
                            <button disabled={update} type="submit" onClick={()=>setBtn1(true)} style={{marginRight:"10px"}} class="btn btn-primary">Ajouter</button>
                            <button type="submit" onClick={()=>setBtn1(false)} class="btn btn-warning">Modifier</button>
                        </div>
                        </form>
                </Card.Body>
            </Card> 
        </div>   
    </div>
  )
}

export default FichePatient;