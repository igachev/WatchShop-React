import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { getWatchesBeforeSearchAction,searchedWatchesAction } from "../../store/actions/watchActions"
import { isAuthenticated } from "../../store/selectors/authSelectors"
import { bindActionCreators } from "redux"
import "./SearchWatches.css"
import { isLoading } from "../../store/selectors/spinnerSelectors"
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner"
import WatchesCard from "../../components/WatchesCard/WatchesCard"

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
        {props.isLoading && <LoadingSpinner />}
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
           <div key={watch._id}>
            <WatchesCard type="search" watch={watch} isAuthenticated={props.isAuthenticated} />
           </div>
))

: (<p>Not found</p>)}

    </div>

    </div>

    </div>
)

}

const mapStateToProps = (state) => {
    return {
        searchedWatches: state.watches.searchedWatches,
        isAuthenticated: isAuthenticated(state),
        isLoading: isLoading(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({getWatchesBeforeSearchAction,searchedWatchesAction},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(SearchWatches)