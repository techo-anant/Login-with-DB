import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Eye, EyeOff } from "lucide-react"; // or FontAwesome/Bootstrap icons
import './../styles/signup.css'

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    async function handleSubmit(event) {
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

            if (response.status === 200) {
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
                            onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div className='mb-3 text-start'>
                        <label htmlFor='password'>Password</label>
                        <div className="position-relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder='Enter Password'
                                className='form-control pe-5'
                                onChange={setPassword}
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