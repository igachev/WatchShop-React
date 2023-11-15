import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { getWatchesBeforeSearchAction,searchedWatchesAction } from "../../store/actions/watchActions"
import { Link } from "react-router-dom"
import { isAuthenticated } from "../../store/selectors/authSelectors"
import { bindActionCreators } from "redux"

function SearchWatches(props) {

useEffect(() => {
props.getWatchesBeforeSearchAction()
},[]);

const [brand,setBrand] = useState('')

function searchWatches(e) {
    e.preventDefault()
    props.searchedWatchesAction(brand)
}

return (
    <div>

    <h1>Search By Brand</h1>

    <div>

    <form onSubmit={searchWatches}>
        <div>
            <label>Brand Name:</label>
            <input 
            type="text"
            value={brand}
            onChange={(e) => setBrand(e.target.value)} />
        </div>

        <div>
            <button type="submit">Search</button>
        </div>
    </form>

    <div>
        <p>Results:</p>

        {props.searchedWatches.length > 0

? (props.searchedWatches.map((watch) =>
<div key={watch._id}>
<p>Brand: {watch.brand}</p>
<p>Model: {watch.model}</p>
<p>Price: {watch.price}</p>
<Link to={`/watches/${watch._id}`}>Details</Link>
{!props.isAuthenticated && <p>You must be logged in to buy</p>}
</div>))

: (<p>Not found</p>)}

    </div>

    </div>

    </div>
)

}

const mapStateToProps = (state) => {
    return {
        searchedWatches: state.watches.searchedWatches,
        isAuthenticated: isAuthenticated(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({getWatchesBeforeSearchAction,searchedWatchesAction},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(SearchWatches)