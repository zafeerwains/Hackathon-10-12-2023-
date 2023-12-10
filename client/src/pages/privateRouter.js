import React from 'react';
import { useAuthContext } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

export default function PrivateRoutesForAdmin({ Component }) {
  const { isAuth, user } = useAuthContext();

  if (!isAuth) {
    return <Navigate to="/Auth" />;
  }

//   if (isAuth && user.role === "doctor") {
//     return <Navigate to="/doctorDashboard" />;
//   }

  if (isAuth || user.role === "patient") {
    return <Navigate to="/patientDashboard" />;
  }

  return <Component />;
}
