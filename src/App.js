import logo from './logo.svg';
import './App.css';
import LoginSignup from './Components/LoginSignup/LoginSignup';

function App() {
  return (
    <div>
      <p className='head-name'>Metronome</p>
      <LoginSignup />
      <div><p className="branding-text">Metronome by Astrisklab</p></div>
    </div>
  );
}

export default App;
