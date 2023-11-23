import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { getAllWatchesAction,increasePageAction,decreasePageAction } from "../../store/actions/watchActions"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import { isAdmin, isAuthenticated } from "../../store/selectors/authSelectors"
import "./Watches.css"
import { isLoading } from "../../store/selectors/spinnerSelectors"
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner"

function Watches({currentPage,itemsPerPage,getAllWatchesAction,totalPages,increasePageAction,decreasePageAction,watches,isOwner,isAuthenticated,isLoading}) {

    useEffect(() => {
        getAllWatchesAction(currentPage, itemsPerPage);

    },[currentPage,itemsPerPage,getAllWatchesAction]);

    function onNext(e) {
        e.preventDefault()
        if(currentPage === totalPages) {
            return;
        }
        increasePageAction()
    }

    function onPrevious(e) {
        e.preventDefault()
        if(currentPage === 1) {
            return;
        }
        decreasePageAction()
    }


    return (
        <div className="outer-watches-container">

            {isLoading && <LoadingSpinner />}
            <h1>Watches</h1>

           <div className="watches-container">

           {watches.length > 0

            ? (watches.map((watch) =>
            <div key={watch._id} className="watches-card">
            <div className="watches-img-container"><img src={watch.image} alt="watch" /></div>
            <p>Brand: {watch.brand}</p>
            <p>Model: {watch.model}</p>
            <p>Price:  € {watch.price}</p>
            <Link to={`/watches/${watch._id}`}>Details</Link>
            {!isAuthenticated && <p>You must be logged in to buy</p>}
            </div>))

            : (<p>No watches available</p>)}

           </div>

            <div className="watches-btns">
            <button onClick={onPrevious}>Previous Page</button>
            <button onClick={onNext}>Next Page</button>
            </div>

        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        watches: state.watches.watches,
        currentPage: state.watches.currentPage,
        itemsPerPage: state.watches.itemsPerPage,
        totalPages: state.watches.totalPages,
        isOwner: isAdmin(state),
        isAuthenticated: isAuthenticated(state),
        isLoading: isLoading(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({getAllWatchesAction,increasePageAction,decreasePageAction},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Watches)