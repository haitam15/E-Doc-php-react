import React from 'react';
import { Link } from 'react-router-dom'
import patient from '../images/patient.png';
import doctor from '../images/doctor.png';
import secretary from '../images/secretary.png';
import styles from './CSS/Welcome.module.css';


const Welcome = () => {
    return (
        <div className={styles.Welcome}>
            <div className={styles.Logo}>
            </div>
            <div className={styles.title}>
                <h2>choisissez votre role</h2>
            </div>
            {/*  Navigation Rounds */}
            <div className={styles.rounds}>
                <Link to='/MedecinZone/login'>
                    <div className={styles.round}>
                        <img src={doctor} alt={styles.doctor}></img>
                        <h3 className={styles.roundTitle}>Médecin</h3>
                    </div>
                </Link>
                <Link to='SecretaryZone/login'>
                    <div className={styles.round}>
                        <img src={secretary} alt="secretary"></img>
                        <h3 className={styles.roundTitle}>Secrétaire</h3>
                    </div>
                </Link>
                <Link to='PatientZone/login'>
                    <div className={styles.round}>
                        <img src={patient} alt="patient"></img>
                        <h3 className={styles.roundTitle}>Patient</h3>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Welcome;


