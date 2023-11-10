import { useState } from "react"

function Login(props) {

const [email,setEmail] = useState('')
const [password,setPassword] = useState('')

const errorsObj = {email: '',password: ''}
const [errors,setErrors] = useState(errorsObj)


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
        </div>

        </div>
    )
}

export default Login