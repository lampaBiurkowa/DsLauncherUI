import React from "react";
import "./Review.scss";
import Spacer from "../../../components/spacer/Spacer";
import Rating from "../../../components/rating/Rating";

function Review({ review }) {
  return (
    <div className="review-container">
      <div className="header">
        <img
          src="/public/img/user.png"
          alt="Profile picture"
          className="profile-picture"
        />
        <span className="username">User</span>
        <Spacer />
        <span className="published">18.07.2000</span>
        <Rating value={5} isReadOnly={true} />
      </div>

      <span className="content">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut architecto,
        inventore, soluta sed aperiam minus fuga itaque mollitia reiciendis,
        consequatur incidunt ea tempore? Magni dolorem perspiciatis iusto
        corporis dignissimos repellendus!
      </span>
    </div>
  );
}

export default Review;
