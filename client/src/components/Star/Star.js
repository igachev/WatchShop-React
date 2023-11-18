import './star.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faStar } from '@fortawesome/free-solid-svg-icons'



export default function Star(props) {
    
    return (
       
      <span 
      onClick={props.onRate} 
      onMouseEnter={props.onHoverIn} 
      onMouseLeave={props.onHoverOut}>
        {props.full ? (
         <FontAwesomeIcon icon={faStar} size="xl" style={{color: "#96a61c",}} />
        ) : (
        <FontAwesomeIcon icon={faStar} size="xl" style={{color: "#1a1a19",}} />
        )}
          
      </span>
    );
  }