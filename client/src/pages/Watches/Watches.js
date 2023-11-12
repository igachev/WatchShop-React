import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { getAllWatchesAction,increasePageAction,decreasePageAction } from "../../store/actions/watchActions"
import { useEffect } from "react"
import { Link } from "react-router-dom"

function Watches({currentPage,itemsPerPage,getAllWatchesAction,totalPages,increasePageAction,decreasePageAction,watches}) {

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
        <div>
            <h1>Watches</h1>

            {watches.length > 0
            ? (watches.map((watch) =>
            <div key={watch._id}>
            <div >{watch.brand}</div>
            <Link to={`/watches/${watch._id}`}>Details</Link>
            </div>))
            : (<p>No watches available</p>)}

            <div>
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
        totalPages: state.watches.totalPages
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({getAllWatchesAction,increasePageAction,decreasePageAction},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Watches)