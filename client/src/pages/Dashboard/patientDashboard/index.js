import React from 'react'
import { useAuthContext } from '../../../contexts/AuthContext'

export default function index() {
  const {user}=useAuthContext()
  return (
    <>
    <h1>{user.data.patientdata.name} Dashboard</h1>
    </>
  )
}
