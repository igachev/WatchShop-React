import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { createWatchAction } from "../../store/actions/watchActions"

function CreateWatch(props) {

const [brand,setBrand] = useState('')
const [model,setModel] = useState('')
const [image,setImage] = useState('')
const [battery,setBattery] = useState('')
const [mechanism,setMechanism] = useState('')
const [price,setPrice] = useState('')
const [strap,setStrap] = useState('')
const [glass,setGlass] = useState('')
const [waterResistance,setWaterResistance] = useState('')

const navigation = useNavigate()
const dispatch = useDispatch()

function onCreate(e) {
    e.preventDefault()
    dispatch(createWatchAction(brand,model,image,battery,mechanism,
        price,strap,glass,waterResistance,navigation));
    
}

    return (
        <div>
            <h1>Add New Product</h1>

        <div>
            <form onSubmit={onCreate}>

        <div>
            <label>Brand:</label>
            <input type="text"
            value={brand}
            onChange={(e) => setBrand(e.target.value)} />
        </div>

        <div>
            <label>Model:</label>
            <input type="text"
            value={model}
            onChange={(e) => setModel(e.target.value)} />
        </div>

        <div>
            <label>Image Link:</label>
            <input type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)} />
        </div>

        <div>
            <label>Battery:</label>
            <input type="text"
            value={battery}
            onChange={(e) => setBattery(e.target.value)} />
        </div>

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

        <div>
            <label>Price:</label>
            <input 
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)} />
        </div>

        <div>
            <label>Strap:</label>
            <input 
            type="text"
            value={strap}
            onChange={(e) => setStrap(e.target.value)} />
        </div>

        <div>
            <label>Glass:</label>
            <input 
            type="text"
            value={glass}
            onChange={(e) => setGlass(e.target.value)} />
        </div>

        <div>
            <label>Water Resistance:</label>
            <input 
            type="text"
            value={waterResistance}
            onChange={(e) => setWaterResistance(e.target.value)} />
        </div>

        <div>
            <button type="submit">Create</button>
        </div>

            </form>
        </div>

        </div>
    )
}

export default CreateWatch