import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { getAllWatchesAction,increasePageAction,decreasePageAction,getTotalPagesAction } from "../../store/actions/watchActions"
import { useEffect } from "react"

function Watches(props) {

    useEffect(() => {
        props.getTotalPagesAction()
    }, [])

    useEffect(() => {
        props.getAllWatchesAction(props.currentPage, props.itemsPerPage);
    }, [props.currentPage, props.itemsPerPage]);

    function onNext(e) {
        e.preventDefault()
        if(props.currentPage === props.totalPages) {
            return;
        }
        props.increasePageAction()
    }

    function onPrevious(e) {
        e.preventDefault()
        if(props.currentPage === 1) {
            return;
        }
        props.decreasePageAction()
    }


    return (
        <div>
            <h1>Watches</h1>

            {props.watches.length > 0
            ? (props.watches.map((watch) => 
            <div key={watch._id}>{watch.brand}</div>))
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
    return bindActionCreators({getAllWatchesAction,increasePageAction,decreasePageAction,getTotalPagesAction},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Watches)