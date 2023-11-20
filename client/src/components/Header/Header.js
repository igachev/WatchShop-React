import { Link, useNavigate } from "react-router-dom"
import { isAdmin, isAuthenticated } from "../../store/selectors/authSelectors"
import { connect, useDispatch } from "react-redux"
import { logoutAction } from "../../store/actions/authActions"
import "./Header.css"

export function Header(props) {

const navigation = useNavigate()
const dispatch = useDispatch()

function onLogout(e) {
    e.preventDefault();
    dispatch(logoutAction(navigation))
}

return (
    
        
    <div className="container">

    <div className="img-logo">
    <Link to="/"><img src="https://images.unsplash.com/photo-1575203091586-611fe505bb0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="logo" /></Link>
    </div>

    <div className="link-container">
        <ul>
    <li><Link to='/'>Watches</Link></li>
    <li><Link to='/watches/search'>Search</Link></li>
    
    {!props.isAuthenticated && (
        <>
    <li><Link to='/users/login'>Login</Link></li>
    <li><Link to='/users/register'>Register</Link></li>
        </>
    )}

    {props.isOwner && (
        <>
        <li><Link to='/watches/create'>Create Product</Link></li>
        <li><Link to='/users/adminHistory'>All Purchases</Link></li>
        <li><button onClick={onLogout}>Logout</button></li>
        </>
    )}

    {props.isAuthenticated && !props.isOwner && (
        <>
        <li><Link to='/users/cart'>Cart</Link></li>
        <li><Link to='/users/purchaseHistory'>Purchase History</Link></li>
        <li><button onClick={onLogout}>Logout</button></li>
        </>
    )}
    </ul>
    </div>

    </div>

    
)
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: isAuthenticated(state),
        isOwner: isAdmin(state)
    }
}

export default connect(mapStateToProps)(Header)