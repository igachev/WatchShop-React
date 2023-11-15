import { bindActionCreators } from "redux"
import { isAuthenticated } from "../../store/selectors/authSelectors"
import { getWatchesFromCartAction } from "../../store/actions/authActions"
import { useEffect } from "react"
import { connect } from "react-redux"

function UserCart(props) {

useEffect(() => {
props.getWatchesFromCartAction()
},[])

return (
    <div>
        <h1>User Cart</h1>

    <div>

    {props.shopCart.length > 0 
    ? props.shopCart.map((watch) =>
    <div key={watch._id}>
        <p>Brand: {watch.brand}</p>
        <p>Model: {watch.model}</p>
        <p>Price: {watch.price}</p>

    </div>
    )
    : <p>Cart is empty</p>
    }

    </div>

    </div>
)
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: isAuthenticated(state),
        shopCart: state.auth.shopCart
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({getWatchesFromCartAction},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(UserCart)