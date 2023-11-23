import "./LoadingSpinner.css";

function LoadingSpinner(props) {
    return (
        <div className="spinner">
        <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
    )
}

export default LoadingSpinner