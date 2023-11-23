import { useState } from "react"
import "./CartForm.css"

function CartForm(props) {

    const [name,setName] = useState('')
    const [phone,setPhone] = useState('')
    const [address,setAddress] = useState('')
    const [quantity,setQuantity] = useState('')
    
    const errorsObj = {name:'',phone:'',address:'',quantity:''}
    const [errors,setErrors] = useState(errorsObj)

    function handleBuy(e) {
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

    props.onBuy(props.watch._id,name,phone,address,quantity,props.watch.price)

    }

    function handleRemove(e) {
        e.preventDefault()
        props.onRemove(props.watch._id)
    }

return (
    <div key={props.watch._id} className="watch-in-cart">
        <div className="cart-image"><img src={props.watch.image} alt="watch" /></div>
        <h4>Brand: {props.watch.brand}</h4>
        <p>Model: {props.watch.model}</p>
        <p>Battery: {props.watch.battery}</p>
        <p>Mechanism: {props.watch.mechanism}</p>
        <p>Price: € {props.watch.price}</p>
        <p>Strap: {props.watch.strap}</p>
        <p>Glass: {props.watch.glass}</p>
        <p>Water Resistance: {props.watch.waterResistance}</p>
        

        <div className="cart-form">

            <h4>Buyer Details</h4>
            <form onSubmit={handleBuy}>

                <div>
        <label>Name:</label>
        <input 
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)} />
                </div>

        {errors.name && <div className="validation-error">{errors.name}</div>}

                <div>
        <label>Phone:</label>
        <input 
        type="text"
        value={phone}
        onChange={(e) => setPhone(e.target.value)} />
                </div>

        {errors.phone && <div className="validation-error">{errors.phone}</div>}

                <div>
        <label>Address:</label>
        <input 
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)} />
                </div>

        {errors.address && <div className="validation-error">{errors.address}</div>}

                <div>
        <label>Quantity:</label>
        <input 
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)} />
                </div>

        {errors.quantity && <div className="validation-error">{errors.quantity}</div>}

                <div className="cart-btns">
                    <button type="submit" className="buy-btn">Buy</button>
                    <button onClick={handleRemove} className="remove-btn">Remove From Cart</button>
                </div>
            </form>

        <div>
            
        </div>

        </div>

    </div>
)

}

export default CartForm