import './App.css';
import Routing from './Routing';
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  
  return (
    <GoogleOAuthProvider clientId= "438843242975-st8cr2t3h386fv0093dh0cjcirvq5aqm.apps.googleusercontent.com">
    <div className="App">
      <Routing/>
      </div>
    </GoogleOAuthProvider>
    
  );
}

export default App;