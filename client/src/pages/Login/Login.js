
import { connect } from "react-redux"
import { loginAction } from "../../store/actions/authActions"
import "./Login.css"
import { isLoading } from "../../store/selectors/spinnerSelectors"
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner"
import { bindActionCreators } from "redux"
import AuthForm from "../../components/AuthForm/AuthForm"

function Login(props) {

    return (
        <div className="login-outer-container">
            {props.isLoading && <LoadingSpinner />}
            <h1>Login Page</h1>

           <AuthForm 
            type="login"
            onSubmit={props.loginAction}
            errorMessage={props.errorMessage}
           />

        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        errorMessage: state.auth.errorMessage,
        isLoading: isLoading(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({loginAction},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Login)