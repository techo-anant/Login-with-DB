import React , {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import './../styles/signup.css'

function Signup() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: "include",
            body: JSON.stringify({
                name: name,
                email: email,
                password: password
            })
            });

            const data = await response.json();

            alert(data.message);
            if(response.status === 201 || response.status === 400){
                navigate('/login');
            }
        } catch (error) {
            console.error('Signup error:', error);
            alert("An error occurred while signing up.");
        }
    }

    return (
    <div className='bg-primary vh-100 d-flex justify-content-center align-items-center'>
        <div className='box bg-white'>
            <form onSubmit={handleSubmit}>
                <div className='mb-3 text-start'>
                    <label htmlFor='name'>Name</label>
                    <input type='text' placeholder='Enter Name' className='form-control'
                    onChange={(e) => setName(e.target.value)}/>
                </div>
                <div className='mb-3 text-start'>
                    <label htmlFor='email'>Email</label>
                    <input type='email' placeholder='Enter Email' className='form-control p-2'
                    required
                    onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className='mb-3 text-start'>
                    <label htmlFor='password'>Password</label>
                    <input type='password' placeholder='Enter Password' className='form-control'
                    onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <button className='btn btn-success'>Signup</button>
            </form>
        </div>
    </div>
    )
}

export default Signup