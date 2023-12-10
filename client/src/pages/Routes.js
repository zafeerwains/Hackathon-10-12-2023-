import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Frontend/Home';
// import { useAuthContext } from '../contexts/AuthContext';
import Login from './Auth/login/Login';
import SignUp from './Auth/signUp/SignUp';


export default function Index() {
    // const { isAuth, user } = useAuthContext();

    return (
        <>
            {/* <Header /> */}
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/Auth" element={<Login />} />
                    <Route path="/Auth/createUser" element={<SignUp />} />
                    
                </Routes>
            </main>
            {/* <Footer /> */}
        </>
    );
}