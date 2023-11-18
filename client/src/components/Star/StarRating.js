import { useState } from 'react';
import Star from './Star';

export default function StarRating() {
  const [rating, setRating] = useState(0);
  const [tempRating, setTempRating] = useState(0);

  function handleRating(rating) {
    setRating(rating);
  }
  return (
    <div >
        <p>Rate:</p>
      {Array.from({ length: 5 }, (k, i) => (
        <Star
          key={i}
          full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
       //   onRate={() => handleRating(i + 1)}
          onHoverIn={() => setTempRating(i + 1)}
          onHoverOut={() => setTempRating(0)}
        />
      ))}
      <div>{tempRating || rating || ''}</div>
    </div>
  );
}