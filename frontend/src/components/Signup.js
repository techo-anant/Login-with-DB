import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from "lucide-react"; // or FontAwesome/Bootstrap icons
import './../styles/signup.css'

function Signup() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

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
            if (response.status === 201 || response.status === 400) {
                navigate('/login');
            }
        } catch (error) {
            console.error('Signup error:', error);
            alert("An error occurred while signing up.");
        }
    }

    const [passwordError, setPasswordError] = useState("");

    function validatePassword(pw) {
        const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,16}$/;
        return regex.test(pw);
    }

    function handlePasswordChange(e) {
        const pw = e.target.value;
        setPassword(pw);

        if (!validatePassword(pw)) {
            setPasswordError("Must contain uppercase \nMust contain number \nMust contain symbol \nMust have (8-16 chars)\n");
        } else {
            setPasswordError("");
        }
    }

    return (
        <div className='bg-primary vh-100 d-flex justify-content-center align-items-center'>
            <div className='box bg-white'>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3 text-start'>
                        <label htmlFor='name'>Name</label>
                        <input type='text' placeholder='Enter Name' className='form-control'
                            onChange={(e) => setName(e.target.value)}
                            required
                            maxLength={50}
                        />
                    </div>
                    <div className='mb-3 text-start'>
                        <label htmlFor='email'>Email</label>
                        <input type='email' placeholder='Enter Email' className='form-control p-2'
                            required
                            onChange={(e) => setEmail(e.target.value)}
                            maxLength={50}
                        />
                    </div>
                    <div className='mb-3 text-start'>
                        <label htmlFor='password'>Password</label>
                        <div className="position-relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder='Enter Password'
                                className='form-control pe-5'
                                onChange={handlePasswordChange}
                                required
                                maxLength={16}
                                minLength={8}
                            />
                            {/* Eye toggle inside input */}
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                style={{
                                    position: "absolute",
                                    right: "10px",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    border: "none",
                                    background: "transparent",
                                    padding: 0,
                                    display: "flex",       // ensures the icon is visible
                                    alignItems: "center",
                                    justifyContent: "center",
                                    cursor: "pointer",
                                    color: "#6c757d"
                                }}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>
                    {passwordError && <small style={{ color: "red", whiteSpace: "pre-line", textAlign: "start" }}>{passwordError}</small>}
                    <button className='btn btn-success mt-3'>Signup</button>
                </form>
            </div>
        </div>
    )
}

export default Signup