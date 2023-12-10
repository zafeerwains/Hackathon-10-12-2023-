import React from "react";
import { Link } from "react-router-dom"
// import { useAuthContext } from "../contexts/AuthContext";
import { Button, Divider, Form, Input, message } from "antd";
import Title from "antd/es/typography/Title";
import { useState } from "react";

const inputStyle = {
    border: 'none',
    borderBottom: '2px solid #000',
    outline: 'none',
    boxShadow: 'none',
    color: '#000',
    background: "transparent"
};

export default function Login() {
    // const { readUser } = useAuthContext()
    const [isProcessing, setIsProcessing] = useState(false)
    const [state, setState] = useState({ email: "", password: "" })
    const handleChange = (e) => setState({ ...state, [e.target.name]: e.target.value })
    const handleLogin = async (e) => {
        e.preventDefault()
        let { email, password } = state
        setIsProcessing(true)
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                readUser(user);
                message.success("Logged In successfully")
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                message.error("Some Error Occurs in Log In")
            })
            .finally(() => {
                setIsProcessing(false)
            });
    }
    return (
        <>
            <main className='auth p-8 sm:p-8 md:p-12  '>

                <div className="card p-8 md:p-12   w-80 md:w-2/4 sm:w-72 rounded-xl" style={{ border: " 1px solid #000" }}>


                    <Title className='m-0 text-center ' style={{ color: "#000" }}>Login</Title>
                    <Divider style={{ backgroundColor: "black" }} />

                    <Form layout="vertical">
                        <Form.Item label="Email" style={{ color: "#000" }}>
                            <Input className="" name='email' style={inputStyle} onChange={handleChange} />
                        </Form.Item>
                        <Form.Item label="Password" >
                            <Input type="password" className="" style={inputStyle} name='password' onChange={handleChange} />
                        </Form.Item >
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