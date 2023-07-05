import logo from './logo.svg';
import './App.css';
import { Routes ,Route } from 'react-router-dom';
import HomePage from './components/HomePage.js'
import Login from './components/Login/Login';
import RentCloths from './components/RentCloths/RentCloths';
import DemoReg from './components/DemoReg/DemoReg';
import MyRents from './components/MyRents/MyRents';
import Cart from './components/Cart/Cart';
const App=()=> {
  return (
   <>
    <Routes>
    <Route path='/' element={<HomePage/>} />
    <Route path='/log-in' element={<Login/>} />
    <Route path='/rentCloths' element={<RentCloths/>} />
    <Route path='/demo' element={<DemoReg/>} />
    <Route path='/myrents' element={<MyRents/>} />
    <Route path='/cart' element={<Cart/>} />
    
    </Routes>
   </>
  );
}

export default App;
