import { Link, useNavigate } from "react-router-dom"
import { isAdmin, isAuthenticated } from "../../store/selectors/authSelectors"
import { connect, useDispatch } from "react-redux"
import { logoutAction } from "../../store/actions/authActions"

export function Header(props) {

const navigation = useNavigate()
const dispatch = useDispatch()

function onLogout(e) {
    e.preventDefault();
    dispatch(logoutAction(navigation))
}

return (
    <div>
        
    <div className="container">

    <div className="link-container">
    <Link to='/'>Watches</Link>
    <Link to='/watches/search'>Search</Link>
    
    {!props.isAuthenticated && (
        <>
    <Link to='/users/login'>Login</Link>
    <Link to='/users/register'>Register</Link>
        </>
    )}

    {props.isOwner && (
        <>
        <Link to='/watches/create'>Create Product</Link>
        <Link to='/users/adminHistory'>All Purchases</Link>
        <button onClick={onLogout}>Logout</button>
        </>
    )}

    {props.isAuthenticated && !props.isOwner && (
        <>
        <Link to='/users/cart'>Cart</Link>
        <Link to='/users/purchaseHistory'>Purchase History</Link>
        <button onClick={onLogout}>Logout</button>
        </>
    )}

    </div>

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