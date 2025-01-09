import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { onLogIn } from './../services/AuthService';
import { Navigate, useNavigate } from 'react-router-dom';


const Login = () => {
    const [loginData, setLogin] = useState({})
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()
    console.log("loginData:", loginData)

    const onSubmit = async () => {
        console.log("userName", userName)
        console.log("password", password)
        await fetch('https://dummyjson.com/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: userName,
                password: password,
                expiresInMins: 30,
            })
        })
            .then(res => res.json())
            .then(res => {
                localStorage.setItem("login", JSON.stringify(res.accessToken));
                navigate('blogs')
            })
            .catch((err) => {
                console.log("err", err)
            })
    }


    return (
        <div>
            <div style={{ paddingTop: 150, display: 'flex', flexDirection: "column", justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ width: '40%' }}>
                    <Form.Label htmlFor="inputPassword5">User Name</Form.Label>
                    <Form.Control
                        type="username"
                        id="inputPassword5"

                        // onChange={(res)=>{console.log(res.target.value)}}
                        onChange={(res) => { setUserName(res.target.value) }}
                        // defaultValue='emilys'
                        value={userName}
                        aria-describedby="passwordHelpBlock"
                    />
                </div>
                <div style={{ width: '40%' }}>
                    <Form.Label htmlFor="inputPassword5">Password</Form.Label>
                    <Form.Control
                        type="password"
                        id="inputPassword5"
                        onChange={(res) => { setPassword(res.target.value) }}
                        value={password}
                        // defaultValue='emilyspass'
                        aria-describedby="passwordHelpBlock"
                    />
                    {/* <Form.Text id="passwordHelpBlock" muted>
                        Your password must be 8-20 characters long, contain letters and numbers,
                        and must not contain spaces, special characters, or emoji.
                    </Form.Text> */}
                </div>
                <div style={{ paddingTop: 20 }}>
                    <Button onClick={() => onSubmit()} variant="primary">Primary</Button>
                </div>
            </div>
        </div>
    )
}

export default Login