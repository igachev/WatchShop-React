
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Suspense, lazy } from 'react';
import Header from './components/Header/Header';

const Login = lazy(() => import('./pages/Login/Login'))
const Register = lazy(() => import('./pages/Register/Register'))
const Watches = lazy(() => import('./pages/Watches/Watches'))

function App() {

let routes = <Routes>
  <Route path='/' element={<Watches />} />
  <Route path='/users/register' element={<Register />} />
  <Route path='/users/login' element={<Login />} />
</Routes>

  return (
    <div>
     <Header />

    <div>
      <Suspense fallback={<div>Loading...</div>}>
        {routes}
      </Suspense>
    </div>

    </div>
  );
}

export default App;
