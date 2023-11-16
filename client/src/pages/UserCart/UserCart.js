import { bindActionCreators } from "redux"
import { isAuthenticated } from "../../store/selectors/authSelectors"
import { getWatchesFromCartAction,removeWatchFromUserCartAction,buyWatchAction } from "../../store/actions/authActions"
import { useEffect, useState } from "react"
import { connect } from "react-redux"

function UserCart(props) {

useEffect(() => {
props.getWatchesFromCartAction()
},[])

const [name,setName] = useState('')
const [phone,setPhone] = useState('')
const [address,setAddress] = useState('')
const [quantity,setQuantity] = useState('')

const errorsObj = {name:'',phone:'',address:'',quantity:''}
const [errors,setErrors] = useState(errorsObj)

function onRemove(e,watchId) {
    e.preventDefault()
    props.removeWatchFromUserCartAction(watchId)
}

function onBuy(e,price,watchId) {
    e.preventDefault()

    let error = false;
    const errorObj = {...errorsObj}

    if(name === '') {
        error = true;
        errorObj.name = 'Name is required'
    }

    if(phone === '') {
        error = true;
        errorObj.phone = 'Phone is required'
    }

    if(address === '') {
        error = true;
        errorObj.address = 'Address is required'
    }

    if(quantity === '') {
        error = true;
        errorObj.quantity = 'Quantity is required'
    }

    setErrors(errorObj)

    if(error) {
        return;
    }

    props.buyWatchAction(watchId,name,phone,address,quantity,price)
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
            <form onSubmit={(e) => onBuy(e,watch.price,watch._id)}>

                <div>
        <label>Name:</label>
        <input 
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)} />
                </div>

        {errors.name && <div>{errors.name}</div>}

                <div>
        <label>Phone:</label>
        <input 
        type="text"
        value={phone}
        onChange={(e) => setPhone(e.target.value)} />
                </div>

        {errors.phone && <div>{errors.phone}</div>}

                <div>
        <label>Address:</label>
        <input 
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)} />
                </div>

        {errors.address && <div>{errors.address}</div>}

                <div>
        <label>Quantity:</label>
        <input 
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)} />
                </div>

        {errors.quantity && <div>{errors.quantity}</div>}

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
    return bindActionCreators({getWatchesFromCartAction,removeWatchFromUserCartAction,buyWatchAction},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(UserCart)