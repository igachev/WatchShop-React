import { Link } from "react-router-dom";
import "./WatchesCard.css"

function WatchesCard({type,watch,isAuthenticated}) {

   let isSearch = type === 'search'

    return (
<div className={ isSearch ? 'search-watches-card' : 'watches-card' }>
            <div className={`${type}-img-container`}><img src={watch.image} alt="watch" /></div>
            <p>Brand: {watch.brand}</p>
            <p>Model: {watch.model}</p>
            <p>Price:  € {watch.price}</p>
            <Link to={`/watches/${watch._id}`}>Details</Link>
            {!isAuthenticated && <p>You must be logged in to buy</p>}
            </div>
    )
}

export default WatchesCard