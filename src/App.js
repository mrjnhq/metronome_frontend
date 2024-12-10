import './App.css';
import DashboardPage from './Components/dashboard/DashboardPage';
import EmailVerification from './Components/forgetPass/EmailVerification';
import ForgetPassword from './Components/forgetPass/Forgetpass';
import LoginSignup from './Components/LoginSignup/LoginSignup';

function App() {
  return (
    <div>
      {/* <p className='head-name'>Metronome</p>
      <p className='text-yellow-500'>Metronome</p>
      <LoginSignup />
      <div><p className="branding-text">Metronome by Astrisklab</p></div> */}
     <DashboardPage/>
     {/* <EmailVerification/>
     <ForgetPassword/> */}
    </div>
  );
}

export default App;
