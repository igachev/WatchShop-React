import { useState } from "react"
import { connect, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { loginAction } from "../../store/actions/authActions"

function Login(props) {

const [email,setEmail] = useState('')
const [password,setPassword] = useState('')

const errorsObj = {email: '',password: ''}
const [errors,setErrors] = useState(errorsObj)

const navigation = useNavigate()
const dispatch = useDispatch()

function onLogin(e) {
    e.preventDefault();

    let error = false;
    let errorObj = {...errorsObj}

    if(email === '') {
        error = true;
        errorObj.email = 'Email is required'
    }

    if(password === '') {
        error = true;
        errorObj.password = 'Password is required'
    }

    setErrors(errorObj)

    if(error) {
        return;
    }

    dispatch(loginAction(email,password,navigation))

}

    return (
        <div>
            <h1>Login Page</h1>

        <div>
            <form onSubmit={onLogin}>

            <div>
                <label>Email:</label>
                <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} />
            </div>

            {errors.email && <div>{errors.email}</div>}

            <div>
                <label>Password:</label>
                <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} />
            </div>

            {errors.password && <div>{errors.password}</div>}

            <div>
                <button type="submit">Login</button>
            </div>

            </form>

        {props.errorMessage && <div>{props.errorMessage}</div>}

        </div>

        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        errorMessage: state.auth.errorMessage
    }
}

export default connect(mapStateToProps)(Login)