import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { getWatchesBeforeSearchAction,searchedWatchesAction } from "../../store/actions/watchActions"
import { Link } from "react-router-dom"
import { isAuthenticated } from "../../store/selectors/authSelectors"
import { bindActionCreators } from "redux"
import "./SearchWatches.css"

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
    <div className="outer-search-container">

    <h1>Search By Brand</h1>

    

    <div className="search-form-container">
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
    </div>

    <div className="results-outer-container">
        <p className="result-p">Results:</p>

        <div className="search-container">

        {props.searchedWatches.length > 0
        

? (props.searchedWatches.map((watch) =>
<div key={watch._id} className="search-watches-card">
<div className="search-img-container"><img src={watch.image} alt="watch" /></div>
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