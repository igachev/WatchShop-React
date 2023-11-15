import { bindActionCreators } from "redux"
import {getSingleWatchAction,deleteWatchAction} from "../../store/actions/watchActions"
import { useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { connect } from "react-redux"
import { isAdmin, isAuthenticated } from "../../store/selectors/authSelectors"


function SingleWatch(props) {

const {watchId} = useParams()
const navigation = useNavigate()

useEffect(() => {
    props.getSingleWatchAction(watchId)
},[])

function onDelete(e) {
    e.preventDefault()
    if(window.confirm('Are you sure you want to delete this watch?')) {
        props.deleteWatchAction(watchId,navigation)
    }
}

return (
    <div>

    <div>
        <h1>Watch Details</h1>
        <div>{props.watch.model}</div>

        <div>
            {props.isOwner && (
                <>
                <button onClick={onDelete}>Delete</button>
                <Link to={`/watches/${props.watch._id}/edit`}>Edit</Link>
                </>
            )}

                {props.isAuthenticated && !props.isOwner && (
                    <>
                    <button>Add To Cart</button>
                    </>
                )}

        </div>



    </div>

    </div>
)
}

const mapStateToProps = (state) => {
    return {
        watch: state.watches.watch,
        isOwner: isAdmin(state),
        isAuthenticated: isAuthenticated(state)
    }
}

const mapDispatchToProps = (dispatch) => {
return bindActionCreators({getSingleWatchAction,deleteWatchAction},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(SingleWatch)