import React from 'react';
import './CSS/RdvCard.css'
import { Card } from 'react-bootstrap';
import Popup from "reactjs-popup";
import { useForm } from 'react-hook-form';
import { useState } from 'react';

const RdvCard = (props) => {
    const [returnedData, setReturnedData] = useState(null)
    const { M_S, ordre, time } = props.appointmentData;
    const token  = props.token;
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const onSubmit = (data) => {
        data.M_S = M_S;
        data.ordre = ordre-1;
        console.log(JSON.stringify(data));
        fetch("http://127.0.0.1/E-DOC/api/Secretaire/ajouterRendezVous.php", {
            method: "post",
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " +token
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                setReturnedData(data)
                reset()
            })
    };

    return (
        <div className="col-md-4 appointmentType">
            <Card style={{ width: '18rem', border: "none", boxShadow: "5px 5px 10px lightGray",backgroundColor:"white" }}>
                <Card.Body>
                    <h5>RDV</h5>
                    <p className="mb-2 text-muted">{time}</p>
                    <p><small></small></p>
                    <Popup trigger={<button>Prendre Un Rdv</button>} contentStyle={{ width: "600px", border: "none", background: "transparent" }} modal closeOnDocumentClick>
                        <div className="popupDetails">
                            <h5>{ordre}</h5>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <input name="time" className="takeInput" placeholder="Time" defaultValue={time} {...register('time')} />
                                <br />
                                <br />
                                <input  className="takeInput" placeholder="Nom Du patient" {...register('name',{ required: true })} />
                                <br />
                                {errors.name && "Champs Obligatoire"}
                                <br />
                                <input  className="takeInput" placeholder="C.I.N" {...register('cin', { required: true,maxLength:8 })}  />
                                <br />
                                {errors.cin && "Entrer Un CIN valide"}
                                <br />
                                <input  className="takeInput" placeholder="Email" {...register('email',{ pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, required: true })} />
                                <br />
                                {errors.email && "Entrer Un Email Valide"}
                                <br />
                                <input className="takeInput" placeholder="mm/dd/yyyy" defaultValue={props.fullDate1} {...register('jour',{ required: true })} />
                                <br />
                                {errors.jour && "Entrer Une Date Valide"}
                                <br />
                                <div className="submitBtn">
                                    <input type="submit" value="Send" />
                                </div>
                                {
                                    returnedData &&
                                    <div>
                                        <p>Rdv enregistré avec succés</p>
                                        <a href="/secretaryZone/secretaryDashbord">Revenir Vers Le Tablea De Board</a>
                                    </div>
                                }
                            </form>
                        </div>
                    </Popup>

                </Card.Body>
            </Card>
        </div>
    );
};

export default RdvCard;