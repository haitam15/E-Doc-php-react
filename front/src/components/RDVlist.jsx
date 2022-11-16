import React,{ useState,useEffect} from 'react';
import Popup from "reactjs-popup";
import './CSS/CardList.css';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';


function CardList() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin;
    const [availables,setAvailable] = useState([]);
    const [D, setDate] = React.useState();
    const [dateValue,setDateValue] = React.useState("2022-01-01");
    const [RdvData, setRdvData] = useState([]);

    const countryData = [
        { value: 'USA', name: 'USA' },
        { value: 'CANADA', name: 'CANADA' }            
    ];

    const onSubmit = (data) => {
        console.log(data);
        const body = {"jour":data?.jour,"M_S":data?.M_S,"Rid":data?.Rid,"ordre":data?.ordre}
        console.log(body);
        fetch("http://127.0.0.1/E-Doc/api/Secretaire/modiferRdv.php", {
            method: "post",
            headers: {
                "Content-type": "application/json",
                "Authorization": 'Bearer '+userInfo?.jwt
            },
            body: JSON.stringify(body)
        })
            .then(res => res.json())
            .then(data => {
                window.location.replace("http://localhost:3000/secretaryZone/ListRdv");
            })
    };
    const makeRdvData = (data)=>{
        //console.log(data?.M?.dispo);
        console.log(data);
        let Rdv = [];
        //ajouter les Rendez-Vous du matin
        for(let i=0; i<data?.length; i++){
            Rdv.push(data[i]);
        }
        //ajouter les Rendez-Vous du Soir
        setRdvData(Rdv);
    }

    const changeDate = (ev)=>{
        setDate(ev.target.value);
        console.log(D);
        let d = new Date( D );
        let dd = d.getDate();
        let mm = d.getMonth()+1;
        let yy = d.getFullYear();
        let fullDate = `${yy}/${mm}/${dd}`;
        setDateValue(fullDate);
        console.log(fullDate);
        const body = {"fullDate":fullDate };
        fetch("http://127.0.0.1/E-DOC/api/Secretaire/allRdv.php", {
            method: "post",
            headers: { 
                "Authorization":'Bearer '+userInfo?.jwt,
            },
            body: JSON.stringify(body)
        })
            .then(res => res.json())
            .then(data => {
                makeRdvData(data);
            })
    }
    return (
        <div className="row" >
            <div className="d_flex my-4">
                <h3 style={{fontWeight: "1rem"}}>Selectionner Une Date</h3>
            </div>
            <input onChange={changeDate}  name="date" type="date" style={{width: "30%"}} value={dateValue}></input>
            <div className="d_flex my-4, text-uppercase">
                <h1 style={{textAlign: 'center',marginTop:"40px"}}>Liste Des RDV</h1>
            </div>
            <table className="table table-bordered">
                <thead className="thead-dark">
                    <tr>
                        <th>Nom</th>
                        <th>CIN</th>
                        <th>email</th>
                        <th>periode</th>
                        <th>ordre</th>
                        <th>Modifier</th>
                        <th>Supprimer</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        RdvData.map(item =>(
                            <tr key={item.ordre}>
                                <td>{item.name}</td>
                                <td>{item.cin}</td>
                                <td>{item.email}</td>
                                <td>{item.M_S === "M" ? "Matin":"Soir"}</td>
                                <td>{item.ordre}</td>
                                <td><Popup trigger={<button class="btn btn-primary">Modifier</button>} contentStyle={{ width: "200px", border: "none", background: "transparent" }} modal closeOnDocumentClick>
                                <div className="popupDetails">
                                    <h5 style={{textAlign:"center"}}>Modifier le RDV</h5>
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <input className="takeInput" value={item.Rid} {...register('Rid',{ required: true })} ></input>
                                        <br />
                                        <input className="takeInput" placeholder="yyyy/mm/dd"  {...register('jour',{ required: true })} ></input>
                                        <br />
                                        <input className="takeInput" placeholder="ordre"  {...register('ordre',{ required: true })} ></input>
                                        <br />
                                        <br />
                                        <select {...register('M_S',{ required: true })} name="M_S" style={{marginLeft:"12rem"}}>
                                                <option value="M">Matin</option>
                                                <option value="S">Soir</option>
                                        </select>
                                        <br />
                                        <br />
                                        <div className="submitBtn">
                                            <input type="submit" value="Send" />
                                        </div>
                                        {/* {
                                            returnedData &&
                                            <div>
                                                <p>Rdv enregistré avec succés</p>
                                                <a href="/secretaryZone/secretaryDashbord">Revenir Vers Le Tablea De Board</a>
                                            </div>
                                        } */}
                                    </form>
                        </div>
                                    </Popup>
                                </td>
                                <td><button type="button" class="btn btn-danger" onClick={()=>{
                                    if(window.confirm("Are you sure you want to delete?"))
                                        {
                                            fetch("http://127.0.0.1/E-DOC/api/Secretaire/supprimerRdv.php", {
                                                method: "post",
                                                headers: { 
                                                    "Authorization":'Bearer '+userInfo?.jwt,
                                                },
                                                body: JSON.stringify({
                                                    Rid:item.Rid
                                                })
                                            })
                                            window.location.replace("http://localhost:3000/");
                                        }
                                    }} >Supprimer</button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default CardList
