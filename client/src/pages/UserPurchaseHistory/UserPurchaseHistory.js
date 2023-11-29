import { bindActionCreators } from "redux"
import { getUserPurchaseHistoryAction } from "../../store/actions/authActions"
import { connect } from "react-redux"
import { useEffect } from "react"
import "./UserPurchaseHistory.css"
import { isLoading } from "../../store/selectors/spinnerSelectors"
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner"
import TableRowElement from "../../components/TableRowElement/TableRowElement"

function UserPurchaseHistory(props) {

useEffect(() => {
    props.getUserPurchaseHistoryAction()
},[])

    return (
        <div className="purchase-history-container">
            {props.isLoading && <LoadingSpinner />}
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
         <TableRowElement type="user" details={details} key={details._id} />
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
        userPurchaseHistory: state.auth.userPurchaseHistory,
        isLoading: isLoading(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({getUserPurchaseHistoryAction},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(UserPurchaseHistory)