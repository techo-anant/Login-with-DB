import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function handleSubmit(event){
        event.preventDefault();
                try {
            const response = await fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: email,
                password: password
            })
            });

            const data = await response.json();

            alert(data.message);
        } catch (error) {
            console.error('Login error:', error);
            alert("An error occurred while Logging up.");
        }
    }

    const navigate = useNavigate();

    const gotoSignup = (event) => {
        event.preventDefault();
        navigate('/signup');
    }

    return (
    <div className='d-flex vh-100 justify-content-center align-items-center bg-primary'>
        <div className='d-flex p-3 bg-white w-50 h-50 justify-content-center align-items-center' >
            <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor='email'>Email</label>
                    <input type='email' placeholder='Enter Email' className='form-control'
                    onChange={e => setEmail(e.target.value)}/>
                </div>
                <div className='mb-3'>
                    <label htmlFor='password'>Password</label>
                    <input type='password' placeholder='Enter Password' className='form-control'
                    onChange={e => setPassword(e.target.value)}/>
                </div>
                <div>
                    <button className='btn btn-success'>Login</button>
                    <button className='btn btn-success' onClick={gotoSignup}>Signup</button>
                </div>
                
            </form>
        </div>
    </div>
    )
}

export default Login