import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';


const Success = () => {
  const navigate = useNavigate();
  function goToSignout(event){
    event.preventDefault();
    navigate('/signout');
  }
  async function handleLogout(event) {
    event.preventDefault();
    try{
      const response = await fetch("http://localhost:5000/success", {
        method: "POST",
        credentials: "include"
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
        <div className='d-rflex w-100 justify-content-center align-items-center' style={{ height: "100vh"}}>
            <h1 className=''>Hi there, you have successfully logged In! <br/>
              <b>Have your home page here.</b>
            </h1>
            <div>
              <button onClick={handleLogout} className='btn btn-success mt-3'>Logout</button>
              <button onClick={goToSignout} className='btn btn-success mt-3' style={{ marginLeft: "20px" }}>Signout</button>
            </div>
        </div>
    </div>
  )
}

export default Success