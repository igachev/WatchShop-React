import { bindActionCreators } from "redux"
import { getUserPurchaseHistoryAction } from "../../store/actions/authActions"
import { connect } from "react-redux"
import { useEffect } from "react"
import "./UserPurchaseHistory.css"

function UserPurchaseHistory(props) {

useEffect(() => {
    props.getUserPurchaseHistoryAction()
},[])

    return (
        <div className="purchase-history-container">
            <h1>Purchase History</h1>

        <div>
            {!props.userPurchaseHistory && <h3>You haven't bought anything yet</h3>}

        <table>

        <thead>
                  <tr>
                    <th>order №</th>
                    <th>Brand</th>
                    <th>Model</th>
                    <th>quantity</th>
                    <th>date</th>
                    <th>totalSum</th>
                  </tr>
        </thead>

        <tbody>

        { props.userPurchaseHistory.length > 0
        ? (props.userPurchaseHistory.map((details) => 
         <tr key={details._id}>
            <td>{details._id}</td>
            <td>{details.watchId.brand}</td>
            <td>{details.watchId.model}</td>
            <td>{details.quantity}</td>
            <td>{details.date.toString().split('T')[0]}</td>
            <td>{details.totalSum}</td>
         </tr>))
         : (null)
         }

        </tbody>

        </table>

        </div>

        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        userPurchaseHistory: state.auth.userPurchaseHistory
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({getUserPurchaseHistoryAction},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(UserPurchaseHistory)