import {React,useEffect,useState} from 'react'
import { useForm } from 'react-hook-form';
import { Card } from 'react-bootstrap';
import { useLocation } from "react-router-dom"
import SideBarMed from '../sideBarMed';
import '../CSS/ficheAdd.css';
import '../CSS/bilan.css';
import {useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux';

function Comptabilite() {
    const [revenu, setRevenu] = useState();
    const [total,setTotal] = useState();
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
    const genererBilan = (data,res)=>{
        const {factures,salaire} = data;
        const {total} = res;

        const r = parseInt(total,10) * 200 - parseInt(factures,10) - parseInt(salaire,10);
        setTotal(total);
        setRevenu(r);

    }
    const onSubmit = (data) => {
        console.log(JSON.stringify(data));
        var obj = {
            method: 'post',
            headers: {
              'Authorization': 'Bearer '+userInfo?.jwt, 
            },
            body:JSON.stringify(data)
          }
        fetch("http://127.0.0.1/E-DOC/api/Medecin/totalConsultations.php",obj)
        .then(res => res.json())
        .then(
            (res)=>{
                console.log(res);
                genererBilan(data,res);
            }
        )
}
  return (
      <div className="compta" style={{display: 'flex', flexDirection: 'row'}}>
          <SideBarMed/>
        <div className="formFiche" style={{width:'70%',marginLeft:'378px'}}>
            <div className="mb-3">
                <Card style={{ margin:"4% auto",width:"60%",border: "2px solid black", boxShadow: "5px 5px 10px lightGray",backgroundColor:"#FBEEC1" }}>
                    <Card.Body>
                        <h5 style={{textAlign:"center",marginBottom:"45px",color:"green"}}>Générer Le bilan des revenus</h5>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <label for="exampleInputEmail1" class="form-label">Somme des factures</label>
                            <div style={{width:"100%"}}>
                                <input type="text" className="form-control" placeholder="Somme des Factures" {...register('factures', { required: true})}  />
                            </div>
                            <br />
                            <label for="exampleInputEmail1" class="form-label">Salaire des empolyés</label>
                            <div style={{width:"100%"}}>
                                <input className="form-control"  placeholder="Salaire des empolyés" {...register('salaire',)} />
                            </div>
                            <br />
                            <div style={{width:"100%",display: 'flex', flexDirection: 'row',justifyContent: 'space-between'}}>
                                <label class="form-label">Date début</label>
                                <input className="form-control" type="date" placeholder="Type d'assurance"  {...register('dateD',{ required: true })} />
                                <label class="form-label">Date Fin</label>
                                <input type="date" className="form-control"  placeholder="Type d'assurance"  {...register('dateF',{ required: true })} />
                            </div>
                            <br />
                            <button type="submit" style={{marginRight:"10px"}} class="btn btn-primary">Generer</button>
                            </form>
                    </Card.Body>
                </Card> 
            </div>
            {revenu && 
            <div>
                <h2 style={{textAlign:"center"}}>Le Bilan</h2>
                <table class="table">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Revenu Total</th>
                        <th scope="col">Nombre De consultation</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <th scope="row">1</th>
                        <td>{revenu}</td>
                        <td>{total}</td>
                        </tr>
                    </tbody>
                </table>
            </div>}
        </div>
    </div>
  )
}

export default Comptabilite;