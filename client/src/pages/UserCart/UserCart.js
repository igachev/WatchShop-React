import { bindActionCreators } from "redux"
import { isAuthenticated } from "../../store/selectors/authSelectors"
import { getWatchesFromCartAction,removeWatchFromUserCartAction } from "../../store/actions/authActions"
import { useEffect } from "react"
import { connect } from "react-redux"

function UserCart(props) {

useEffect(() => {
props.getWatchesFromCartAction()
},[])

function onRemove(e,watchId) {
    e.preventDefault()
    props.removeWatchFromUserCartAction(watchId)
}

return (
    <div>
        <h1>User Cart</h1>

    <div>

    {props.shopCart.length > 0 
    ? props.shopCart.map((watch) =>
    <div key={watch._id}>
        <h4>Brand: {watch.brand}</h4>
        <p>Model: {watch.model}</p>
        <p>Price: {watch.price}</p>
        <p>Strap: {watch.strap}</p>
        <p>Glass: {watch.glass}</p>
        <p>Water Resistance: {watch.waterResistance}</p>

        <div>

            <h4>Buyer Details</h4>
            <form>

                <div>
        <label>Name:</label>
        <input type="text" />
                </div>

                <div>
        <label>Phone:</label>
        <input type="text" />
                </div>

                <div>
        <label>Address:</label>
        <input type="text" />
                </div>

                <div>
        <label>Quantity:</label>
        <input type="number" />
                </div>

                <div>
                    <button type="submit">Buy</button>
                    <button onClick={(e) => onRemove(e,watch._id)}>Remove From Cart</button>
                </div>
            </form>

        <div>
            
        </div>

        </div>

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
    return bindActionCreators({getWatchesFromCartAction,removeWatchFromUserCartAction},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(UserCart)