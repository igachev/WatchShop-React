
function Register(props) {
    return (
        <div>
            <h1>Register Page</h1>

        <div>
            <form>

        <div>
            <label for="email">Email</label>
            <input type="email" name="email" id="email" />
        </div>

        <div>
            <label for="password">Password</label>
            <input type="password" name="password" id="password" />
        </div>

        <div>
            <label for="repeatPassword">Repeat Password</label>
            <input type="password" name="repeatPassword" id="repeatPassword" />
        </div>

        <div>
            <button type="submit">Register</button>
        </div>

            </form>

        </div>

        </div>
    )
}

export default Register