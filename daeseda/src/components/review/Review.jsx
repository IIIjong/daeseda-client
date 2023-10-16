import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import review from "../../assets/images/review.png";
import axios from "axios";
import { useEffect, useState } from "react";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; 

function Review() {
  const [reviews, setReviews] = useState([]);
  const groupSize = 5; //슬라이드당 다섯개 표현

  useEffect(() => {
    axios
      .get("http://localhost:8088/review/list")
      .then(function (response) {
        setReviews(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const groupedReviews = [];
  for (let i = 0; i < reviews.length; i += groupSize) {
    groupedReviews.push(reviews.slice(i, i + groupSize));
  }

  return (
    <Carousel>
      {groupedReviews.map((group, groupIndex) => (
        <ReviewLayout key={groupIndex}>
          {group.map((reviewData, index) => (
            <ReviewArticle key={index}>
              <Img src={reviewData.imageUrl} alt={`Review Image ${index}`} />
              <Rating>
                {Array(Math.round(reviewData.rating)).fill().map((_, i) => (
                  <FontAwesomeIcon key={i} icon={faStar} style={{ color: "#ffc700" }} />
                ))}
                {Array(5 - Math.round(reviewData.rating)).fill().map((_, i) => (
                  <FontAwesomeIcon key={i} icon={faStar} />
                ))}
              </Rating>
              <ReviewInfo>
                <p>{reviewData.reviewTitle}</p>
                <Small>{reviewData.reviewContent}</Small>
              </ReviewInfo>
            </ReviewArticle>
          ))}
        </ReviewLayout>
      ))}
    </Carousel>
  );
}


const ReviewLayout = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const ReviewArticle = styled.article`
  width: 200px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Img = styled.img`
  border-radius: 0.5rem;
  box-shadow: 0px 0px 7px #666;
  width: 200px;
  height: 200px;
`;

const Rating = styled.div`
  font-size: 28px;
  display: flex;
  gap: 4px;
  color: #d9d9d9;
`;

const ReviewInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const Small = styled.p`
  font-size: 12px;
`;

export default Review;
