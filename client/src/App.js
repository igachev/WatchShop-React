
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import { Suspense, lazy, useEffect } from 'react';
import Header from './components/Header/Header';
import { isAdmin, isAuthenticated } from './store/selectors/authSelectors';
import { connect, useDispatch } from 'react-redux';
import { checkAutoLogin } from './services/authService';

const Login = lazy(() => import('./pages/Login/Login'))
const Register = lazy(() => import('./pages/Register/Register'))
const Watches = lazy(() => import('./pages/Watches/Watches'))
const SingleWatch = lazy(() => import('./pages/SingleWatch/SingleWatch'))
const CreateWatch = lazy(() => import('./pages/CreateWatch/CreateWatch'))
const EditWatch = lazy(() => import('./pages/EditWatch/EditWatch'))
const SearchWatches = lazy(() => import('./pages/SearchWatches/SearchWatches'))
const UserCart = lazy(() => import('./pages/UserCart/UserCart'))
const UserPurchaseHistory = lazy(() => import('./pages/UserPurchaseHistory/UserPurchaseHistory'))
const AdminPurchaseHistory = lazy(() => import('./pages/AdminPurchaseHistory/AdminPurchaseHistory'))

function App(props) {

const dispatch = useDispatch()
const navigation = useNavigate()

useEffect(() => {
  checkAutoLogin(dispatch,navigation)
},[])

let routes = <Routes>
  <Route path='/' element={<Watches />} />
  <Route path='/watches/:watchId' element={<SingleWatch />} />
  <Route path='/watches/:watchId/edit' element={<EditWatch />} />
  <Route path='/watches/create' element={<CreateWatch />} />
  <Route path='/watches/search' element={<SearchWatches />} />
  <Route path='/users/register' element={<Register />} />
  <Route path='/users/login' element={<Login />} />
  <Route path='/users/cart' element={<UserCart />} />
  <Route path='/users/purchaseHistory' element={<UserPurchaseHistory />} />
  <Route path='/users/adminHistory' element={<AdminPurchaseHistory />} />
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

const mapStateToProps = (state) => {
    return {
      isAuthenticated: isAuthenticated(state),
      isOwner: isAdmin(state)
    }
}

export default connect(mapStateToProps)(App);
