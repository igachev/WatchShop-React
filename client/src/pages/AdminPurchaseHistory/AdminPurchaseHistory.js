import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { getAdminPurchaseHistoryAction } from "../../store/actions/authActions"
import { useEffect } from "react"
import "./AdminPurchaseHistory.css";
import { isLoading } from "../../store/selectors/spinnerSelectors";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import TableRowElement from "../../components/TableRowElement/TableRowElement";

function AdminPurchaseHistory(props) {

useEffect(() => {
    props.getAdminPurchaseHistoryAction()
},[])

return (
    <div className="admin-purchase-history-container">
        {props.isLoading && <LoadingSpinner />}
        <h1>All purchases made by users</h1>

    <div>
    {!props.adminHistory && <h3>There are no purchases made</h3>}

    <table>

    <thead>
        <tr data-testid="table-headers-row">
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

    <tbody data-testid="table-body">
    { props.adminHistory.length > 0
        ? (props.adminHistory.map((details) => 
        <TableRowElement type="admin" details={details} key={details._id} />
        ))
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
        adminHistory: state.auth.adminHistory,
        isLoading: isLoading(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({getAdminPurchaseHistoryAction},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(AdminPurchaseHistory)