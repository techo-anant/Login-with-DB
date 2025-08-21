import  { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './../styles/signup.css'

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function handleSubmit(event){
        event.preventDefault();
                try {
            const response = await fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: "include",
            body: JSON.stringify({
                email: email,
                password: password
            })
            });

            const data = await response.json();

            if ( response.status === 200){
                navigate('/success');
                return;
            }
            alert(data.message);
        } catch (error) {
            console.error('Login error:', error);
            alert("An error occurred while Logging up.");
        }
    }

    const gotoSignup = (event) => {
        event.preventDefault();
        navigate('/signup');
    }

    return (
    <div className='d-flex vh-100 justify-content-center align-items-center bg-primary'>
        <div className='box bg-white' >
            <form onSubmit={handleSubmit}>
                <div className='mb-3 text-start'>
                    <label htmlFor='email'>Email</label>
                    <input type='email' placeholder='Enter Email' className='form-control'
                    required
                    onChange={e => setEmail(e.target.value)}/>
                </div>
                <div className='mb-3 text-start'>
                    <label htmlFor='password'>Password</label>
                    <input type='password' placeholder='Enter Password' className='form-control'
                    onChange={e => setPassword(e.target.value)}/>
                </div>
                <div>
                    <button className='btn btn-success me-3'>Login</button>
                    <button className='btn btn-success ms-3' onClick={gotoSignup}>Signup</button>
                </div>
                
            </form>
        </div>
    </div>
    )
}

export default Login