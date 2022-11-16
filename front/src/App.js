import React from 'react'
import { BrowserRouter as Router, Routes, Route,Link } from 'react-router-dom'
import Login from './components/SecretaryZone/Login';
import LoginP from './components/PatientZone/LoginP';
import Dashbord from './components/SecretaryZone/dashbord';
import ListRdv from './components/SecretaryZone/ListRdv';
import ListPatient from './components/SecretaryZone/ListPatient';
import Register from './components/PatientZone/Register'
import Welcome from './components/Welcome'
import Appointment from './components/SecretaryZone/Appointement';
import LoginM from './components/MedecinZone/LoginM';
import Accueil from './components/MedecinZone/Accueil';
import DossMedic from './components/MedecinZone/DossMedic';
import Patients from './components/MedecinZone/Patients';
import FichePatient from './components/SecretaryZone/FichePatient';
import Consultation from './components/MedecinZone/Consultation';
import Comptabilite from './components/MedecinZone/Comptabilite';
import Rdv from './components/MedecinZone/Rdv';
const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/Welcome' element={<Welcome />} />
          <Route path='/' element={<Welcome />} />
          <Route path='/secretaryZone/login' element={<Login />} />
          <Route path='/PatientZone/login' element={<LoginP />} />
          <Route path='/PatientZone/register' element={<Register />} />
          <Route path='/secretaryZone/secretaryDashbord' element={<Dashbord />} />
          <Route path='/secretaryZone/ListRdv' element={<ListRdv />} />
          <Route path='/secretaryZone/listePatients' element={<ListPatient />} />
          <Route path='/secretaryZone/calendar' element={<Appointment />} />
          <Route path='/MedecinZone/login' element={<LoginM />} />
          <Route path='/MedecinZone/Accueil' element={<Accueil />} />
          <Route path='/MedecinZone/DossiersMedicaux' element={<DossMedic />} />
          <Route path='/MedecinZone/Patients' element={<Patients />} />
          <Route path='/MedecinZone/Rdv' element={<Rdv />} />
          <Route path="/secretaryZone/AddFiche" element={<FichePatient/>} />
          <Route path="/MedecinZone/Comptabilite" element={<Comptabilite/>} />
          <Route path="/MedecinZone/Consultation" element={<Consultation/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App;
