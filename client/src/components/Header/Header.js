import { Link, useNavigate } from "react-router-dom"
import { isAuthenticated } from "../../store/selectors/authSelectors"
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
    
    {!props.isAuthenticated && (
        <>
    <Link to='/users/login'>Login</Link>
    <Link to='/users/register'>Register</Link>
        </>
    )}

    {props.isAuthenticated && (
        <>
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
        isAuthenticated: isAuthenticated(state)
    }
}

export default connect(mapStateToProps)(Header)