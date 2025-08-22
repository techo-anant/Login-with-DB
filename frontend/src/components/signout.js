import './../styles/signup.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function Signout() {

    const navigate = useNavigate();
    async function handleSignout(event){
        event.preventDefault();
        try{
            const response = await fetch("http://localhost:5000/signout",{
                method: "POST",
                credentials: 'include'
            });

            if (response.status === 200) {
                alert("Account Signed Out!");
                navigate('/login');
            } else {
                alert("Error signing out, please try again.");
            }
        }catch(error){
            console.error('Signout error:', error);
            alert("An error occurred while Signing out.");
        }
    }

    return (
        <div className='d-flex w-100 justify-content-center align-items-center' style={{ height: "100vh" }}>
            <div className='box d-flex flex-column align-items-center w-100'>
                <h2 className='text-center'>
                    Thanks for being a customer! <br /> 
                    Remember this will remove all your records from our system and you will have to sign up next time.
                </h2>
                <button className='btn btn-success w-25 mt-3' onClick={handleSignout}>
                    Signout
                </button>
            </div>
        </div>
    );
}

export default Signout;