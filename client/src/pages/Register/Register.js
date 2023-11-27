
import { connect } from "react-redux"
import { registerAction } from "../../store/actions/authActions"
import "./Register.css"
import { isLoading } from "../../store/selectors/spinnerSelectors"
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner"
import { bindActionCreators } from "redux"
import RegisterForm from "../../components/RegisterForm/RegisterForm"

function Register(props) {

    return (
        <div className="register-outer-container">
            {props.isLoading && <LoadingSpinner />}
            <h1>Register Page</h1>

        <RegisterForm
        onRegister={props.registerAction}
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
    return bindActionCreators({registerAction},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Register)