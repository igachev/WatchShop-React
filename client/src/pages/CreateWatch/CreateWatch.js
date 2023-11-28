
import { connect } from "react-redux"
import { createWatchAction } from "../../store/actions/watchActions"
import "./CreateWatch.css"
import { bindActionCreators } from "redux"
import CreateEditForm from "../../components/CreateEditForm/CreateEditForm"

function CreateWatch(props) {

    return (
        <div className="outer">
        <h1>Add New Product</h1>
        <div className="outer-create-container">
            
            <CreateEditForm 
            type="create"
            onSubmit={props.createWatchAction}
            />

        </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({createWatchAction},dispatch)
}

export default connect(null,mapDispatchToProps)(CreateWatch)