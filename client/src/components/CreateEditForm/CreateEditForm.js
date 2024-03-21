import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./CreateEditForm.css"

function CreateEditForm({type,watch,onSubmit}) {
    const [brand,setBrand] = useState('')
    const [model,setModel] = useState('')
    const [image,setImage] = useState('')
    const [battery,setBattery] = useState('')
    const [mechanism,setMechanism] = useState('')
    const [price,setPrice] = useState('')
    const [strap,setStrap] = useState('')
    const [glass,setGlass] = useState('')
    const [waterResistance,setWaterResistance] = useState('')
    
    const errorsObj = {brand:'',model:'',image:'',battery:'',mechanism:'',
    price:'',strap:'',glass:'',waterResistance:''};
    const [errors,setErrors] = useState(errorsObj)
    
    const navigation = useNavigate()

    const isEdit = type === 'edit'

   useEffect(() => {
    if(isEdit && watch) {
        setBrand(watch.brand)
        setModel(watch.model)
        setImage(watch.image)
        setBattery(watch.battery)
        setMechanism(watch.mechanism)
        setPrice(watch.price)
        setStrap(watch.strap)
        setGlass(watch.glass)
        setWaterResistance(watch.waterResistance)
    }
   },[watch,isEdit])
    
    function handleSubmit(e) {
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
    
        if(type === 'create') {
            onSubmit(brand,model,image,battery,mechanism,
                price,strap,glass,waterResistance,navigation);
        }

        else if(type === 'edit') {
            onSubmit(watch._id,brand,model,image,battery,mechanism,
                price,strap,glass,waterResistance,navigation);
        }
        
    }

    return (
        <div className={`${type}-container`} data-testid="create-edit-form">
            <form onSubmit={handleSubmit}>

        <div>
            <label>Brand:</label>
            <input type="text"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            data-testid="brand-input"
            />
        </div>

        {errors.brand && <div className="validation-error">{errors.brand}</div>}

        <div>
            <label>Model:</label>
            <input type="text"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            data-testid="model-input"
            />
        </div>

        {errors.model && <div className="validation-error">{errors.model}</div>}

        <div>
            <label>Image Link:</label>
            <input type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)} 
            data-testid="image-input"
            />
        </div>

        {errors.image && <div className="validation-error">{errors.image}</div>}

        <div>
            <label>Battery:</label>
            <input type="text"
            value={battery}
            onChange={(e) => setBattery(e.target.value)} 
            data-testid="battery-input"
            />
        </div>

        {errors.battery && <div className="validation-error">{errors.battery}</div>}

        <div>
            <label>Mechanism:</label>
            <select 
            value={mechanism} 
            onChange={(e) => setMechanism(e.target.value)}
            data-testid="mechanism-input"
            >
                <option value="" disabled >Select an option</option>
                <option value="mechanical">mechanical</option>
                <option value="automatic">automatic</option>
                <option value="quartz">quartz</option>
            </select>
        </div>

        {errors.mechanism && <div className="validation-error">{errors.mechanism}</div>}

        <div>
            <label>Price:</label>
            <input 
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)} 
            data-testid="price-input"
            />
        </div>

        {errors.price && <div className="validation-error">{errors.price}</div>}

        <div>
            <label>Strap:</label>
            <input 
            type="text"
            value={strap}
            onChange={(e) => setStrap(e.target.value)} 
            data-testid="strap-input"
            />
        </div>

        {errors.strap && <div className="validation-error">{errors.strap}</div>}

        <div>
            <label>Glass:</label>
            <input 
            type="text"
            value={glass}
            onChange={(e) => setGlass(e.target.value)}
            data-testid="glass-input"
            />
        </div>

        {errors.glass && <div className="validation-error">{errors.glass}</div>}

        <div>
            <label>Water Resistance:</label>
            <input 
            type="text"
            value={waterResistance}
            onChange={(e) => setWaterResistance(e.target.value)} 
            data-testid="water-resistance-input"
            />
        </div>

        {errors.waterResistance && <div className="validation-error">{errors.waterResistance}</div>}

        <div className={`${type}-btn`}>
            <button type="submit">{isEdit ? 'Edit' : 'Create'}</button>
        </div>

            </form>
        </div>
    )

}

export default CreateEditForm