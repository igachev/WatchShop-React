import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./AuthForm.css"

function AuthForm({type,onSubmit,errorMessage}) {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [repeatPassword,setRepeatPassword] = useState('')

    let errorsObj = {email:'',password:'',repeatPassword:''}
    const [errors,setErrors] = useState(errorsObj)

    const navigation = useNavigate()

    const isRegister = type === 'register'

    function handleSubmit(e) {
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

        if(isRegister && repeatPassword === '') {
            error = true;
            errorObj.repeatPassword = 'Repeat Password is required'
        }

        setErrors(errorObj)

        if(error) {
            return;
        }

        if(isRegister) {
            onSubmit(email,password,repeatPassword,navigation)
        }
        else {
            onSubmit(email,password,navigation)
        }
        
    }

    return (
        <div className={`${type}-container`}>
            
        <div className={`${type}-form-container`}>
            <form onSubmit={handleSubmit} data-testid="auth-form-submit">

            <div>
                <label>Email:</label>
                <input 
                type="email"
                data-testid="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} />
            </div>

            {errors.email && <div className="validation-error">{errors.email}</div>}

            <div>
                <label>Password:</label>
                <input 
                type="password"
                data-testid="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} />
            </div>

            {errors.password && <div className="validation-error">{errors.password}</div>}

            {isRegister && (
                <div>
                <label >Repeat Password</label>
                <input 
                type="password"
                data-testid="repeat-password"
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)} />
    
                {errors.repeatPassword && <div className="validation-error">{errors.repeatPassword}</div>}
    
            </div>
            )}

            <div className={`${type}-btn`}>
                <button type="submit">{type === 'register' ? 'Register' : 'Login'}</button>
            </div>

            </form>

        {errorMessage && <div className="validation-error">{errorMessage}</div>}

        </div>

        </div>
    )

}

export default AuthForm