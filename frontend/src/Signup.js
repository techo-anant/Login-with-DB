import React , {useState} from 'react'
import axios from 'axios'

function Signup() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password
            })
            });

            const data = await response.json();

            alert(data.message);
        } catch (error) {
            console.error('Signup error:', error);
            alert("An error occurred while signing up.");
        }
    }

    return (
    <div>
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='name'>Email</label>
                    <input type='text' placeholder='Enter Name' 
                    onChange={(e) => setName(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input type='email' placeholder='Enter Email'
                    onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input type='password' placeholder='Enter Password'
                    onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <button>Signup</button>
            </form>
        </div>
    </div>
    )
}

export default Signup