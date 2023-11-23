import { bindActionCreators } from "redux"
import { isAuthenticated } from "../../store/selectors/authSelectors"
import { getWatchesFromCartAction,removeWatchFromUserCartAction,buyWatchAction } from "../../store/actions/authActions"
import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { isLoading } from "../../store/selectors/spinnerSelectors"
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner"
import "./UserCart.css"
import CartForm from "../../components/CartForm/CartForm"

function UserCart(props) {

useEffect(() => {
props.getWatchesFromCartAction()
},[])

return (
    <div className="outer-user-cart">
        {props.isLoading && <LoadingSpinner />}
        <h1>User Cart</h1>

    <div className="user-cart">

    {props.shopCart.length > 0 
    ? (props.shopCart.map((watch) =>
    <
    CartForm
    key={watch._id}
    watch={watch}
    onBuy={props.buyWatchAction}
    onRemove={props.removeWatchFromUserCartAction} 
    />
    
    ))
    : <p>Cart is empty</p>
    }

    </div>

    </div>
)
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: isAuthenticated(state),
        shopCart: state.auth.shopCart,
        isLoading: isLoading(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({getWatchesFromCartAction,removeWatchFromUserCartAction,buyWatchAction},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(UserCart)