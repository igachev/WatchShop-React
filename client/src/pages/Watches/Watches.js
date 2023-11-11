import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { getAllWatchesAction } from "../../store/actions/watchActions"
import { useEffect } from "react"

function Watches(props) {

    useEffect(() => {
    props.getAllWatchesAction() 
    },[])

    return (
        <div>
            <h1>Watches</h1>
            {props.watches.length > 0
            ? (props.watches.map((watch) => 
            <div key={watch._id}>{watch.brand}</div>))
            : (<p>No watches available</p>)}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        watches: state.watches.watches
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({getAllWatchesAction},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Watches)