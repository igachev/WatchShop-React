import { bindActionCreators } from "redux"
import {getSingleWatchAction} from "../../store/actions/watchActions"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { connect } from "react-redux"


function SingleWatch(props) {

const {watchId} = useParams()


useEffect(() => {
    props.getSingleWatchAction(watchId)
},[])

return (
    <div>

    <div>
        <h1>Watch Details</h1>
        <div>{props.watch.model}</div>

        <div>
            {props.isOwner && (
                <button>Delete</button>
            )}
        </div>

    </div>

    </div>
)
}

const mapStateToProps = (state) => {
    return {
        watch: state.watches.watch,
        isOwner: state.auth.auth.isOwner
    }
}

const mapDispatchToProps = (dispatch) => {
return bindActionCreators({getSingleWatchAction},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(SingleWatch)