import React from 'react';
import { useAuthContext } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

export default function PrivateRoutesForAdmin({ Component }) {
  const { isAuth, user } = useAuthContext();

  if (!isAuth) {
    return <Navigate to="/Auth" />;
  } else if (isAuth && user.role === "patient") {
    return <Navigate to="/patientDashboard" />;
  } else if (isAuth && user.role === "doctor") {
    return <Navigate to="/doctorDashboard" />;
  }

  // If none of the conditions match, render the original component
  return <Component />;
}
