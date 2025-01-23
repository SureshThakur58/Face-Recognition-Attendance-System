import logo from './logo.svg';
import './App.css';
import SignInOutContainer from './containers/SignInoutcontainer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import Collectdata from './components/Collectdata';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignInOutContainer />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path='/home'element={<Home/>}/>
        <Route path='/cd' element={<Collectdata/>}/>
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />

      

      </Routes>
    </Router>
  );
}

export default App;
