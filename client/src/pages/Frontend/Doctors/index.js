import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function index() {
    const [DoctorsData, setDoctorsData] = useState([])
    const BookAppopintment=()=>{}
    useEffect(() => {
        axios.get("http://localhost:8000/doctor/doctors")
            .then((response) => {
                console.log("response : ", response.data);
                setDoctorsData(response.data);

            })
            .catch((error) => {
                console.error("Error : ", error);
            });
    }, [])
    return (
        <>
            <h1 className=' text-[#000] pt-24 font-bold text-[48px] text-center italic'>All Doctors </h1>
            <div className="container max-w-[90%] text-[#000] px-4 mx-auto sm:px-8" style={{ background: "transparent" }}>
                <div className="py-8">
                    <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
                        <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
                            <table className="min-w-full leading-normal" >
                                <thead>
                                    <tr>
                                        <th scope="col" className="px-5 py-3 text-2xl text-left  font-bold italic  border-b border-[#000] text-[#000]">
                                            Name
                                        </th>
                                        <th scope="col" className="px-5 py-3 text-2xl text-left  font-bold italic  border-b border-[#000] text-[#000]">
                                            Specilization
                                        </th>
                                        <th scope="col" className="px-5 py-3 text-2xl text-left  font-bold italic  border-b border-[#000] text-[#000]">
                                            Phone Number
                                        </th>
                                        <th scope="col" className="px-5 py-3 text-2xl text-left  font-bold italic  border-b border-[#000] text-[#000]">
                                            Email
                                        </th>
                                        {/* <th scope="col" className="px-5 py-3 text-2xl text-left  font-bold italic  border-b border-[#000] text-[#000]">
                                         Actions
                                        </th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {DoctorsData.map((rowData, index) => (
                                        <tr key={index}>
                                            <td className="px-5 py-5 text-sm  border-b text-left border-[#000] text-[#000]">
                                                <div className="flex items-center">
                                                    <div>
                                                        <p className=" whitespace-no-wrap">{rowData.name}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-5 py-5 text-sm  border-b border-[#000] text-[#000]">
                                                <p className=" whitespace-no-wrap">{rowData.specialization}</p>
                                            </td>
                                            <td className="px-5 py-5 text-sm  border-b border-[#000] text-[#000]">
                                                <p className=" whitespace-no-wrap">{rowData.contactDetails.phoneNumber}</p>
                                            </td>
                                            <td className="px-5 py-5 text-sm  border-b border-[#000] text-[#000]">
                                                {rowData.email}
                                            </td>
                                            {/* <td className="px-5 py-5 text-sm  border-b border-[#000] text-[#000]">
                                                <Space>
                                                    <Tooltip title="Take Appointment" color='red'  ><Button onClick={()=>BookAppopintment()}  />Take Appointment</Tooltip>
                                                    
                                                </Space> */}
                                            {/* </td> */}
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
