import { Link } from "react-router-dom"

export function Header(props) {
return (
    <div>
        
    <div className="container">

    <div className="link-container">
    <Link to='/'>Watches</Link>
    <Link to='/users/login'>Login</Link>
    <Link to='/users/register'>Register</Link>
    </div>

    </div>

    </div>
)
}

export default Header