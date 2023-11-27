import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./LoginForm.css"

function LoginForm(props) {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    
    const errorsObj = {email: '',password: ''}
    const [errors,setErrors] = useState(errorsObj)
    
    const navigation = useNavigate()
    
    
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
    
        props.onLogin(email,password,navigation)
    
    }

    return (
        <div className="login-container">
            

        <div className="login-form-container">
            <form onSubmit={onLogin}>

            <div>
                <label>Email:</label>
                <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} />
            </div>

            {errors.email && <div className="validation-error">{errors.email}</div>}

            <div>
                <label>Password:</label>
                <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} />
            </div>

            {errors.password && <div className="validation-error">{errors.password}</div>}

            <div className="login-btn">
                <button type="submit">Login</button>
            </div>

            </form>

        {props.errorMessage && <div className="validation-error">{props.errorMessage}</div>}

        </div>

        </div>
    )

}

export default LoginForm