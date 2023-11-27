import { useState } from "react"
import "./RegisterForm.css"
import { useNavigate } from "react-router-dom"

function RegisterForm(props) {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [repeatPassword,setRepeatPassword] = useState('')

    let errorsObj = {email:'',password:'',repeatPassword:''}
    const [errors,setErrors] = useState(errorsObj)

    const navigation = useNavigate()
    

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

        props.onRegister(email,password,repeatPassword,navigation)
    }

    return (
        <div className="register-container">

        <div className="register-form-container">
            <form onSubmit={onRegister}>

        <div>
            <label >Email</label>
            <input 
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} />

            {errors.email && <div className="validation-error">{errors.email}</div>}

        </div>

        <div>
            <label>Password</label>
            <input 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} />

            {errors.password && <div className="validation-error">{errors.password}</div>}

        </div>

        <div>
            <label >Repeat Password</label>
            <input 
            type="password"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)} />

            {errors.repeatPassword && <div className="validation-error">{errors.repeatPassword}</div>}

        </div>

        <div className="register-btn">
            <button type="submit">Register</button>
        </div>

            </form>

            {props.errorMessage && <div className="validation-error">{props.errorMessage}</div>}

        </div>

        </div>
    )

}

export default RegisterForm