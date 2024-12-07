import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const Rating = ({ value, text }) => {
  const stars = Array.from({ length: 5 }, (_, index) => {
    const starValue = index + 1; // Star values start from 1
    return (
      <span key={index}>
        {value >= starValue ? (
          <FaStar />
        ) : value >= starValue - 0.5 ? (
          <FaStarHalfAlt />
        ) : (
          <FaRegStar />
        )}
      </span>
    );
  });

  return (
    <div className="rating">
      {stars}
      <span className="rating-text">{text && text}</span>
    </div>
  );
};

export default Rating;
