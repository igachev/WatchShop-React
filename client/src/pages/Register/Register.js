import { useState } from "react"
import { connect, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { registerAction } from "../../store/actions/authActions"

function Register(props) {

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [repeatPassword,setRepeatPassword] = useState('')

    let errorsObj = {email:'',password:'',repeatPassword:''}
    const [errors,setErrors] = useState(errorsObj)

    const navigation = useNavigate()
    const dispatch = useDispatch()

    function onRegister(e) {
        e.preventDefault()
        
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

        if(repeatPassword === '') {
            error = true;
            errorObj.repeatPassword = 'Repeat Password is required'
        }

        setErrors(errorObj)

        if(error) {
            return;
        }

        dispatch(registerAction(email,password,repeatPassword,navigation))
    }

    return (
        <div>
            <h1>Register Page</h1>

        <div>
            <form onSubmit={onRegister}>

        <div>
            <label >Email</label>
            <input 
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} />

            {errors.email && <div>{errors.email}</div>}

        </div>

        <div>
            <label>Password</label>
            <input 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} />

            {errors.password && <div>{errors.password}</div>}

        </div>

        <div>
            <label >Repeat Password</label>
            <input 
            type="password"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)} />

            {errors.repeatPassword && <div>{errors.repeatPassword}</div>}

        </div>

        <div>
            <button type="submit">Register</button>
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

export default connect(mapStateToProps)(Register)