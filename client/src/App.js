
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
const NotFound = lazy(() => import('./pages/NotFound/NotFound'))



function App(props) {

const dispatch = useDispatch()
const navigation = useNavigate()


useEffect(() => {

    checkAutoLogin(dispatch, navigation);
},[])

let routes = 
<Routes>
  <Route path='/' element={<Watches />} />

  <Route path='/watches' >
  <Route path=':watchId' element={<SingleWatch />} />
  <Route path='search' element={<SearchWatches />} />
  </Route>

  <Route path='/users'>
  <Route path='register' element={<Register />} />
  <Route path='login' element={<Login />} />
  </Route>

  <Route path='*' element={<NotFound />} />
  
</Routes>

// route guards
  if(props.isAuthenticated && !props.isOwner) {
    routes = 
    <Routes>
  <Route path='/' element={<Watches />} />

  <Route path='/watches'>
  <Route path='search' element={<SearchWatches />} />
  <Route path=':watchId' element={<SingleWatch />} />
  
  </Route>
  
  <Route path='/users'>
  <Route path='cart' element={<UserCart />} />
  <Route path='purchaseHistory' element={<UserPurchaseHistory />} />
  </Route>

  <Route path='*' element={<NotFound />} />
    </Routes>
  }

  else if(props.isAuthenticated && props.isOwner) {
    routes = 
    <Routes>
  <Route path='/' element={<Watches />} />

  <Route path='/watches'>
  <Route path='create' element={<CreateWatch />} />
  <Route path='search' element={<SearchWatches />} />
  <Route path=':watchId' element={<SingleWatch />} />
  <Route path=':watchId/edit' element={<EditWatch />} />
  </Route>

  <Route path='/users/adminHistory' element={<AdminPurchaseHistory />} />
  
  <Route path='*' element={<NotFound />} />
    </Routes>
  }

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
