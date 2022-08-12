import axios from 'axios';
import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css'


const Login = () => {

    const { register, handleSubmit, reset } = useForm();
    const navigate = useNavigate();

    const submit = data => {
        alert('hiciste Submit');
        axios.post("https://ecommerce-api-react.herokuapp.com/api/v1/users/login", data)
            .then(res => {
                navigate('/')
                localStorage.setItem("token", res.data.data.token)
            })
            .catch(error => {
                if(error.response.status === 404){
                    alert("Credenciales invalidas")
                }
                console.log(error.response)
            })
        reset({
            email: "",
            password: ""
        })
    }

    return (
        <div>
            <h3 style={{ textAlign: 'left'}}>Welcome! Enter your email and password to continue</h3>
            <br/>
            <div className='card'>
                <h4>Test data</h4>
                <br/>
                <p><b>EMAIL</b></p>
                <p>mason@gmail.com</p>
                <p><b>PASSWORD</b></p>
                <p>mason1234</p>
            </div>
            <br/>
            <Form onSubmit={handleSubmit(submit)}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" {...register("email")}/>
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" {...register("password")}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
};

export default Login; <h1>Login</h1>