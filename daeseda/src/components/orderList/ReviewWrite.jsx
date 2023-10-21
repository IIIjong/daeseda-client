//리뷰 작성 컴포넌트
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { useState } from "react";
import Button from "../common/Button";
import axios from "axios";

function ReviewWrite({ orderId }) {
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const token = localStorage.getItem("token");

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const [selectedImage, setSelectedImage] = useState(null);
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");
  const addImgHandler = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  function reviewWriteHandler() {
    const formData = new FormData();

    if (selectedImage) {
      formData.append("image", selectedImage);
    }
    formData.append("orderId", orderId);
    formData.append("rating", rating);
    formData.append("reviewContent", content);

    axios
      .post(`${serverUrl}/review/register`, formData, {
        headers: {
          ...headers,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("리뷰 성공:", response);
        window.location.reload();
      })
      .catch((error) => {
        console.error("리뷰 실패:", error);
      });
  }

  return (
    <ReviewWriteLayout>
      <Title>리뷰작성</Title>
      <p>사진</p>
      {selectedImage ? (
        <ReviewImg src={URL.createObjectURL(selectedImage)} alt="리뷰 사진" />
      ) : (
        <AddImg>
          <label>
            <input
              type="file"
              accept="image/*"
              onChange={addImgHandler}
              style={{ display: "none", width: "100%", height: "100%" }}
            />
            사진 추가
          </label>
        </AddImg>
      )}
      <p>평점</p>
      <Rating>
        {[1, 2, 3, 4, 5].map((star) => (
          <FontAwesomeIcon
            key={star}
            icon={faStar}
            style={{
              color: star <= rating ? "#ffc700" : "#d9d9d9",
              cursor: "pointer",
            }}
            onClick={() => setRating(star)}
          />
        ))}
      </Rating>
      <p>내용</p>
      <Summary
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
        }}
      />
      <Button text="리뷰 작성하기" size="150px" onClick={reviewWriteHandler} />
    </ReviewWriteLayout>
  );
}

const ReviewWriteLayout = styled.section`
  display: flex;
  flex-direction: column;
  width: 400px;
  gap: 10px;
  font-size: 16px;
`;

const Title = styled.p`
  font-size: 18px;
  font-weight: 500;
`;

const ReviewImg = styled.img`
  width: 300px;
  height: 200px;
`;

const AddImg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 100px;
  background-color: rgb(232, 234, 237);
  cursor: pointer;
`;

const Rating = styled.div`
  font-size: 28px;
  display: flex;
  gap: 4px;
  color: #d9d9d9;
`;

const Summary = styled.textarea`
  width: 300px;
  height: 100px;
  border: 1px solid rgb(232, 234, 237);
  outline: none;
  font-size: 18px;
`;

const TitleInput = styled.input`
  border-bottom: 1px solid rgb(232, 234, 237);
  font-size: 18px;
`;
export default ReviewWrite;
