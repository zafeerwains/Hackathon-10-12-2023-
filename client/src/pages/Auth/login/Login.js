import React from "react";
import { Link } from "react-router-dom"
import { useAuthContext } from "../../../contexts/AuthContext";
import { Button, Divider, Form, Input, Select, message } from "antd";
import Title from "antd/es/typography/Title";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";



export default function Login() {
    const { readUser } = useAuthContext()
    const [isProcessing, setIsProcessing] = useState(false)
    const [state, setState] = useState({ email: "", password: "" })
    const [roleOfUser, setRoleOfUser] = useState("")
    const handleChange = (e) => setState({ ...state, [e.target.name]: e.target.value })
    const handleLogin = async (e) => {
        e.preventDefault()
        let role=roleOfUser
        let { email, password } = state
        let loginData = { role:roleOfUser, email, password }
        if (!email || !password || !role) return message.error("Fill all inputs")
        try {
            setIsProcessing(true)
            const response = await axios.post("http://localhost:8000/auth/login", loginData);

let user ={loginData,...jwtDecode(response.data.token)} 
            if (response.status === 200) {
                readUser(user);
               
            } else {
                message.error("Login failed");
            }
        } catch (error) {
            console.error("An error occurred during login:", error.message);
            message.error("Login failed");
        } finally {
            setIsProcessing(false);
        }
        setIsProcessing(false)
    }
    return (
        <>
            <main className='auth p-8 sm:p-8 md:p-12  '>

                <div className="card p-8 md:p-12   w-80 md:w-2/4 sm:w-72 rounded-xl" style={{ border: " 1px solid #000" }}>


                    <Title className='m-0 text-center ' style={{ color: "#000" }}>Login</Title>
                    <Divider style={{ backgroundColor: "black" }} />

                    <Form layout="vertical">
                        <Form.Item label="Email" style={{ color: "#000" }}>
                            <Input className="" name='email' onChange={handleChange} />
                        </Form.Item>
                        <Form.Item label="Password" >
                            <Input type="password" className="" name='password' onChange={handleChange} />
                        </Form.Item >
                        <Form.Item label="Select">
                            <Select onChange={(value) => { setRoleOfUser(value) }}>
                                <Select.Option value="doctor">Doctor</Select.Option>
                                <Select.Option value="patient">Patient</Select.Option>
                            </Select>
                        </Form.Item>

                        <div className="flex justify-content-center">
                            <Button htmlType='submit' className='px-10  mx-auto text-center rounded-2xl hover:rounded-lg ' style={{ background: "transparent", border: " 1px solid #000", color: "#000" }} loading={isProcessing}
                                onClick={handleLogin}
                            >
                                Login</Button>
                        </div>



                        <Form.Item label="New Here ?" >
                            <Link to={"/Auth/createUser"} style={{ color: "#000" }} >
                                <p className="text-3xl underline-offset-2 hover:text-[#8c8cdf]" >Sign Up !</p>
                            </Link>
                        </Form.Item>
                    </Form>
                </div>
            </main>
        </>

    );
}