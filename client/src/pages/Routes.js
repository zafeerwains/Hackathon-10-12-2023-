import React from 'react';
import { Route, Routes ,Navigate} from 'react-router-dom';
import Home from './Frontend/Home';
import { useAuthContext } from '../contexts/AuthContext';
import Login from './Auth/login/Login';
import SignUp from './Auth/signUp/SignUp';
import PrivateRoutesForAdmin from './privateRouter';
import PatientDashboard from './Dashboard/patientDashboard';
import DoctorDashboard from './Dashboard/doctorDashboard';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Doctors from "../pages/Frontend/Doctors"
import Appointment from "../pages/Frontend/Appointments"
import ContactUs from "../pages/Frontend/contactUs"

export default function Index() {
    const { isAuth, user } = useAuthContext();
console.log(isAuth);
    return (
        <>
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route
                        path="/Auth"
                        element={!isAuth ? <Login /> : <Navigate to="/dashboard" />}
                    /> 
                    <Route
                           path="/Auth/createUser"
                        element={!isAuth ? <SignUp /> : <Navigate to="/dashboard" />}
                    />
                      <Route path="/doctors" element={<Doctors/>}/>
                      <Route path="/appointments" element={<Appointment/>}/>
                      <Route path="/contactUs" element={<ContactUs/>}/>
                      
                    <Route
                        path="/dashboard"
                        element={<PrivateRoutesForAdmin Component={DoctorDashboard} />}
                    />
                    <Route
                        path="/patientDashboard"
                        element={<PrivateRoutesForAdmin Component={<PatientDashboard/>} />}
                    />
                    {/* <Route
                        path="/doctorDashboard"
                        element={<PrivateRoutesForAdmin Component={<DoctorDashboard/>} />}
                    /> */}
                   
                
                </Routes>
            </main>
            <Footer />
        </>
    );
}