
import { connect } from "react-redux"
import { editWatchAction } from "../../store/actions/watchActions"
import { isLoading } from "../../store/selectors/spinnerSelectors"
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner"
import "./EditWatch.css"
import { bindActionCreators } from "redux"
import CreateEditForm from "../../components/CreateEditForm/CreateEditForm"

function EditWatch(props) {

    return (
        <div className="outer-edit">
{props.isLoading && <LoadingSpinner />}
<h1>Edit Product</h1>

<div className="outer-edit-container">

        <CreateEditForm
        type="edit"
        watch={props.watch}
        onSubmit={props.editWatchAction}
        />

</div>

        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        watch: state.watches.watch,
        isLoading: isLoading(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({editWatchAction},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(EditWatch)