import React from "react";
import axios from "axios";
import { Link } from "react-router-dom"
import { Button, Divider, Form, Input, Select, message } from "antd";
import Title from "antd/es/typography/Title";
import { useState } from "react";
export default function SignUp() {
    const [isProcessing, setIsProcessing] = useState(false)
    const [roleOfUser, setRoleOfUser] = useState("")
    const [state, setState] = useState({ email: "", password: "", fullName: "", fatherName: "", gender: "", country: "", phoneNumber: "", whatsappNumber: "" })
    const handleChange = (e) => setState({ ...state, [e.target.name]: e.target.value })
    const handleSignUp = async (e) => {
        e.preventDefault();
        setIsProcessing(true);
        let role = roleOfUser

        try {
            const { email, password, fullName, fatherName, gender, phoneNumber, whatsappNumber, specialization } = state;
            let userData = { email, gender, fullName, fatherName, gender, phoneNumber, whatsappNumber, role: roleOfUser, specialization };
            let signUpData = { email, password, role }
            if (!role) return message.error("Fill all inputs");
            if (role === "patient") {
                if (!email || !password || !fullName || !fatherName || !gender || !role || !phoneNumber || !whatsappNumber)

                    return message.error("Fill all inputs");
            }
            if (role === "doctor") {
                if (!email || !password || !fullName || !fatherName || !gender || !role || !phoneNumber || !whatsappNumber || !specialization)

                    return message.error("Fill all inputs");
            }
            axios
                .post("http://localhost:8000/auth/register", signUpData)
                .then((res) => {
                    createUser(userData);
                    message.success("User successfuly Created!!");
                    setIsProcessing(false);
                })
                .catch((error) => {
                    console.log("Error : ", error.message);
                })
        } catch (error) {
            console.error("Error during sign-up:", error.message);
            message.error("Some problem occurred during sign-up");
        } finally {
            setIsProcessing(false);
        }
    };

    const createUser = async (user) => {

        try {
            if (user.role === "doctor") {
                let contactDetails = { phoneNumber: user.phoneNumber, whatsappNumber: user.whatsappNumber }
                let doctorData = { email: user.email, name: user.fullName, contactDetails, specialization: user.specialization, schedule: user.schedule }
                axios
                    .post("http://localhost:8000/doctor/adddoctor", doctorData)
                    .then((res) => {
                        message.success("A new doctor has been added successfully")
                        setIsProcessing(false);
                    })
            }
            if (user.role === "patient") {
                let contactDetails = { phoneNumber: user.phoneNumber, whatsappNumber: user.whatsappNumber }
                let patientData = { email: user.email, name: user.fullName, contactDetails, medicalHistory: {} }
                axios
                    .post("http://localhost:8000/patient/addpatient", patientData)
                    .then((res) => {
                        message.success("A new Patient has been added successfully")
                        setIsProcessing(false);
                    })

            }
        }
        catch (e) {
            message.error("Something went wrong while creating user profile")
            console.error("Error adding document: ", e);
        }
    }
    return (
        <>
            <main className='auth p-8 sm:p-8 md:p-12'>

                <div className="card p-8 md:p-12 w-80 md:w-2/4 sm:w-72 rounded-xl" style={{ border: " 1px solid black" }}>

                    <Title level={2} className='m-0 text-center' >Register/SignUp</Title>
                    <Divider />

                    <Form layout="vertical">
                        <Form.Item label="Full Name" >
                            <Input name='fullName' onChange={handleChange} />
                        </Form.Item>
                        <Form.Item label="Father Name" >
                            <Input name='fatherName' onChange={handleChange} />
                        </Form.Item>
                        <Form.Item label="Phone number with country code" >
                            <Input name='phoneNumber' onChange={handleChange} />
                        </Form.Item>
                        <Form.Item label="Whatsapp number with country code" >
                            <Input name='whatsappNumber' onChange={handleChange} />
                        </Form.Item>
                        <Form.Item label="Gender" >
                            <Input name='gender' onChange={handleChange} />
                        </Form.Item>
                        <Form.Item label="Select">
                            <Select onChange={(value) => { setRoleOfUser(value) }}>
                                <Select.Option value="doctor">Doctor</Select.Option>
                                <Select.Option value="patient">Patient</Select.Option>
                            </Select>
                        </Form.Item>

                        {roleOfUser === "doctor" && (
                            <Form.Item label="Specialization">
                                <Input name="specialization" onChange={handleChange} />
                            </Form.Item>
                        )}
                        <Form.Item label="Email" >
                            <Input name='email' onChange={handleChange} />
                        </Form.Item>
                        <Form.Item label="Password" >
                            <Input type="password" name='password' onChange={handleChange} />
                        </Form.Item >
                        <div className="flex justify-content-center">
                            <Button htmlType='submit' className='px-10  mx-auto text-center rounded-2xl hover:rounded-lg ' style={{ background: "transparent", border: " 1px solid #000", color: "#000" }} loading={isProcessing}
                                onClick={handleSignUp}
                            >
                                Sign Up</Button>
                        </div>
                        <Form.Item label="Already have a account?" >
                            <Link to="/Auth" style={{ color: "#000" }} >
                                <p className="text-3xl underline-offset-2 hover:text-[#7272c5]" >Login !</p>
                            </Link>
                        </Form.Item>
                    </Form>
                </div>

            </main>
        </>

    );
}