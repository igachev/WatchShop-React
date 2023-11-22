import { bindActionCreators } from "redux"
import {getSingleWatchAction,deleteWatchAction,getWatchRatingAction} from "../../store/actions/watchActions"
import { addWatchToCartAction } from "../../store/actions/authActions"
import { useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { connect } from "react-redux"
import { isAdmin, isAuthenticated } from "../../store/selectors/authSelectors"
import StarRating from "../../components/Star/StarRating"
import "./SingleWatch.css"


function SingleWatch(props) {

const {watchId} = useParams()
const navigation = useNavigate()

useEffect(() => {
    props.getSingleWatchAction(watchId);
    props.getWatchRatingAction(watchId);
},[])

function onDelete(e) {
    e.preventDefault()
    if(window.confirm('Are you sure you want to delete this watch?')) {
        props.deleteWatchAction(watchId,navigation)
    }
}

function onAddToCart(e) {
    e.preventDefault()
    props.addWatchToCartAction(watchId)
}

return (
    <div className="outer-details-container">

    <div className="inner-details-container">
        <div className="details-image"><img src={props.watch.image} alt="watch" /></div>
        <h4>Brand: {props.watch.brand}</h4>
        <p>Model: {props.watch.model}</p>
        <p>Battery: {props.watch.battery}</p>
        <p>Mechanism: {props.watch.mechanism}</p>
        <p>Price: € {props.watch.price}</p>
        <p>Strap: {props.watch.strap}</p>
        <p>Glass: {props.watch.glass}</p>
        <p>Water Resistance: {props.watch.waterResistance}</p>
        <p>Average Rating: {props.watchRating}</p>

        <div className="details-btns">
            {props.isOwner && (
                <>
                <button className="delete-btn" onClick={onDelete}>Delete</button>
                <Link className="edit-btn" to={`/watches/${props.watch._id}/edit`}>Edit</Link>
                </>
            )}

                {props.isAuthenticated && !props.isOwner && (
                    <>
                    <StarRating watchId={props.watch._id} />
                    <button className="cart-btn" onClick={onAddToCart}>Add To Cart</button>
                    {props.errorMessage && <p className="error-msg">{props.errorMessage}</p>}
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
        isAuthenticated: isAuthenticated(state),
        errorMessage: state.auth.errorMessage,
        watchRating: state.watches.watchRating
    }
}

const mapDispatchToProps = (dispatch) => {
return bindActionCreators({getSingleWatchAction,deleteWatchAction,addWatchToCartAction,getWatchRatingAction},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(SingleWatch)