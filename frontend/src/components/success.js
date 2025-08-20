import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';


const Success = () => {
  const navigate = useNavigate();
  async function handleLogout(event) {
    event.preventDefault();
    try{
      const response = await fetch("http://localhost:5000/success", {
        method: "POST"
      });

      if(response.status === 500) {
        return alert("Logout failed")
      }
      alert("Logout successful")
      navigate('/login');
    }catch(error) {
          console.error('Logout error:', error);
          alert("An error occurred while Logging out.");
    }
  }
  return (
    <div>
        <div className='d-flex w-100 h-100 justify-content-center align-items-center'>
            <h1>Hi there, you have successfully logged In!
              Please try to login with another email ID and password.
            </h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    </div>
  )
}

export default Success