import "./TableRowElement.css"

function TableRowElement({type,details}) {

    let isAdminTable = type === 'admin'

    if(isAdminTable) {
        return (
            <>
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
         </tr>
           </>
        )
    }

    else if(!isAdminTable) {
        return (
            <>
            <tr key={details._id}>
            <td>{details._id}</td>
            <td>{details.watchId.brand}</td>
            <td>{details.watchId.model}</td>
            <td>{details.quantity}</td>
            <td>{details.date.toString().split('T')[0]}</td>
            <td>{details.totalSum}</td>
         </tr>
            </>
        )
    }
    
}

export default TableRowElement