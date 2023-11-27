
import { connect } from "react-redux"
import { createWatchAction } from "../../store/actions/watchActions"
import "./CreateWatch.css"
import { bindActionCreators } from "redux"
import CreateForm from "../../components/CreateForm/CreateForm"

function CreateWatch(props) {

    return (
        <div className="outer">
        <h1>Add New Product</h1>
        <div className="outer-create-container">
            
            <CreateForm
            onCreate={props.createWatchAction}
            />

        </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({createWatchAction},dispatch)
}

export default connect(null,mapDispatchToProps)(CreateWatch)