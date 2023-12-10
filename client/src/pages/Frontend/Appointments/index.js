import { message } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function index() {
  const [appointmentsData ,setappointmentsData]=useState([])
  const deleteappointment=(id)=>{
axios.delete("http://localhost:8000/appointment/deleteappointment/"+id).then((response)=>{
  const updateData = appointmentsData.filter((appointment) => appointment._id != id);
  setappointmentsData(updateData);

  message.success("Appointment deleted successfully")
})

  }
  useEffect(() => {
    axios.get("http://localhost:8000/appointment/appointments")
        .then((response) => {
            console.log("response : ", response.data);
            setappointmentsData(response.data);

        })
        .catch((error) => {
            console.error("Error : ", error);
        });
}, [])
  return (
   <>
               <h1 className=' text-[#000] pt-24 font-bold text-[48px] text-center italic'>All Appointments </h1>
            <div className="container max-w-[90%] text-[#000] px-4 mx-auto sm:px-8" style={{ background: "transparent" }}>
                <div className="py-8">
                    <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
                        <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
                            <table className="min-w-full leading-normal" >
                                <thead>
                                    <tr>
                                        <th scope="col" className="px-5 py-3 text-2xl text-left  font-bold italic  border-b border-[#000] text-[#000]">
                                            Patient Name
                                        </th>
                                        <th scope="col" className="px-5 py-3 text-2xl text-left  font-bold italic  border-b border-[#000] text-[#000]">
                                            Doctor Name
                                        </th>
                                        <th scope="col" className="px-5 py-3 text-2xl text-left  font-bold italic  border-b border-[#000] text-[#000]">
                                            Appointment Time 
                                        </th>
                                        <th scope="col" className="px-5 py-3 text-2xl text-left  font-bold italic  border-b border-[#000] text-[#000]">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {appointmentsData.map((rowData, index) => (
                                        <tr key={index}>
                                            <td className="px-5 py-5 text-sm  border-b text-left border-[#000] text-[#000]">
                                                <div className="flex items-center">
                                                    <div>
                                                        <p className=" whitespace-no-wrap">{rowData.patientName}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-5 py-5 text-sm  border-b border-[#000] text-[#000]">
                                                <p className=" whitespace-no-wrap">{rowData.doctorName}</p>
                                            </td>
                                            <td className="px-5 py-5 text-sm  border-b border-[#000] text-[#000]">
                                                <p className=" whitespace-no-wrap">{rowData.appointmentTime}</p>
                                            </td>
                                            <td className="px-5 py-5 text-sm  border-b border-[#000] text-[#000]">
                                                <span className='italic bold text-md text-[Green] cursor-pointer' > Edit Appointment</span>
                                                <span onClick={()=>{deleteappointment(rowData._id)}} className='italic bold text-md text-[red] cursor-pointer' > Delete Appointment</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

   </>
  )
}
