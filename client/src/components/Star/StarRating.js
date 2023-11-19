import { useState } from 'react';
import Star from './Star';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addRatingToWatchAction,getWatchRatingAction } from '../../store/actions/watchActions';

 function StarRating(props) {
  const [rating, setRating] = useState(0);
  const [tempRating, setTempRating] = useState(0);

  function handleRating(userRating) {
    setRating(userRating);
    props.addRatingToWatchAction(props.watchId,userRating)
  }
  return (
    <div >
        <p>Rate:</p>
      {Array.from({ length: 5 }, (k, i) => (
        <Star
          key={i}
          full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
          onRate={() => handleRating(i + 1)}
          onHoverIn={() => setTempRating(i + 1)}
          onHoverOut={() => setTempRating(0)}
        />
      ))}
      <div>{tempRating || ''}</div>
      {props.errorMessage && <div>{props.errorMessage}</div>}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    errorMessage: state.watches.errorMessage
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({addRatingToWatchAction,getWatchRatingAction},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(StarRating)