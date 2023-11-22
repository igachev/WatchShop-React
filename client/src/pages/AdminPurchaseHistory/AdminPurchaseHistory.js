import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { getAdminPurchaseHistoryAction } from "../../store/actions/authActions"
import { useEffect } from "react"
import "./AdminPurchaseHistory.css";

function AdminPurchaseHistory(props) {

useEffect(() => {
    props.getAdminPurchaseHistoryAction()
},[])

return (
    <div className="admin-purchase-history-container">
        <h1>All purchases made by users</h1>

    <div>
    {!props.adminHistory && <h3>There are no purchases made</h3>}

    <table>

    <thead>
        <tr>
            <th>order №</th>
            <th>Brand</th>
            <th>Model</th>
            <th>quantity</th>
            <th>date</th>
            <th>totalSum</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Address</th>
        </tr>
    </thead>

    <tbody>
    { props.adminHistory.length > 0
        ? (props.adminHistory.map((details) => 
         <tr key={details._id}>
            <td>{details._id}</td>
            <td>{details.watchId.brand}</td>
            <td>{details.watchId.model}</td>
            <td>{details.quantity}</td>
            <td>{details.date.toString().split('T')[0]}</td>
            <td>{details.totalSum}</td>
            <td>{details.name}</td>
            <td>{details.phone}</td>
            <td>{details.address}</td>
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
        adminHistory: state.auth.adminHistory
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({getAdminPurchaseHistoryAction},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(AdminPurchaseHistory)