import { useState } from "react"
import { connect, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { editWatchAction } from "../../store/actions/watchActions"

function EditWatch(props) {

const [brand,setBrand] = useState(props.watch.brand)
const [model,setModel] = useState(props.watch.model)
const [image,setImage] = useState(props.watch.image)
const [battery,setBattery] = useState(props.watch.battery)
const [mechanism,setMechanism] = useState(props.watch.mechanism)
const [price,setPrice] = useState(props.watch.price)
const [strap,setStrap] = useState(props.watch.strap)
const [glass,setGlass] = useState(props.watch.glass)
const [waterResistance,setWaterResistance] = useState(props.watch.waterResistance)

const errorsObj = {brand:'',model:'',image:'',battery:'',mechanism:'',
price:'',strap:'',glass:'',waterResistance:''};
const [errors,setErrors] = useState(errorsObj)

const navigation = useNavigate()
const dispatch = useDispatch()

function onEdit(e) {
    e.preventDefault()

    let error = false;
    const errorObj = {...errorsObj};

    if(brand === '') {
        error = true;
        errorObj.brand = 'Brand is required'
    }

    if(model === '') {
        error = true;
        errorObj.model = 'Model is required'
    }

    if(image === '') {
        error = true;
        errorObj.image = 'Image is required'
    }

    if(battery === '') {
        error = true;
        errorObj.battery = 'Battery is required'
    }

    if(mechanism === '') {
        error = true;
        errorObj.mechanism = 'Mechanism is required'
    }

    if(price === '') {
        error = true;
        errorObj.price = 'Price is required'
    }

    if(strap === '') {
        error = true;
        errorObj.strap = 'Strap is required'
    }

    if(glass === '') {
        error = true;
        errorObj.glass = 'Glass is required'
    }

    if(waterResistance === '') {
        error = true;
        errorObj.waterResistance = 'Water Resistance is required'
    }

    setErrors(errorObj);

    if(error) {
        return;
    }

    dispatch(editWatchAction(props.watch._id,brand,model,image,battery,mechanism,
        price,strap,glass,waterResistance,navigation));
    
}

    return (
        <div>

<h1>Edit Product</h1>

<div>
    <form onSubmit={onEdit}>

<div>
    <label>Brand:</label>
    <input type="text"
    value={brand}
    onChange={(e) => setBrand(e.target.value)} />
</div>

{errors.brand && <div>{errors.brand}</div>}

<div>
    <label>Model:</label>
    <input type="text"
    value={model}
    onChange={(e) => setModel(e.target.value)} />
</div>

{errors.model && <div>{errors.model}</div>}

<div>
    <label>Image Link:</label>
    <input type="text"
    value={image}
    onChange={(e) => setImage(e.target.value)} />
</div>

{errors.image && <div>{errors.image}</div>}

<div>
    <label>Battery:</label>
    <input type="text"
    value={battery}
    onChange={(e) => setBattery(e.target.value)} />
</div>

{errors.battery && <div>{errors.battery}</div>}

<div>
    <label>Mechanism:</label>
    <select 
    value={mechanism} 
    onChange={(e) => setMechanism(e.target.value)}>
        <option value="" disabled >Select an option</option>
        <option value="mechanical">mechanical</option>
        <option value="automatic">automatic</option>
        <option value="quartz">quartz</option>
    </select>
</div>

{errors.mechanism && <div>{errors.mechanism}</div>}

<div>
    <label>Price:</label>
    <input 
    type="number"
    value={price}
    onChange={(e) => setPrice(e.target.value)} />
</div>

{errors.price && <div>{errors.price}</div>}

<div>
    <label>Strap:</label>
    <input 
    type="text"
    value={strap}
    onChange={(e) => setStrap(e.target.value)} />
</div>

{errors.strap && <div>{errors.strap}</div>}

<div>
    <label>Glass:</label>
    <input 
    type="text"
    value={glass}
    onChange={(e) => setGlass(e.target.value)} />
</div>

{errors.glass && <div>{errors.glass}</div>}

<div>
    <label>Water Resistance:</label>
    <input 
    type="text"
    value={waterResistance}
    onChange={(e) => setWaterResistance(e.target.value)} />
</div>

{errors.waterResistance && <div>{errors.waterResistance}</div>}

<div>
    <button type="submit">Edit</button>
</div>

    </form>
</div>

        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        watch: state.watches.watch
    }
}

export default connect(mapStateToProps)(EditWatch)