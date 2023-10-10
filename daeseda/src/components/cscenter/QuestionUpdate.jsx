import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "../common/Button";
import { useNavigate, useParams } from "react-router-dom"; // useParams 추가
import axios from "axios";

const Main = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin: 20px;
`;

const Title = styled.div`
  border-bottom: solid 1px grey;
  padding: 10px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid gray;
  gap: 8px;
  padding: 12px;
  margin: 10px 0;
  border-radius: 4px;
`;

const ButtonWrap = styled.div`
  display: flex;
  gap: 4px;
  justify-content: center;
`;

const Button2 = styled.button`
  border: 1px solid gray;
  border-radius: 4px;
  color: gray;
  font-size: 18px;
  padding: 8px 12px;
  text-align: center;
`;

const SubTitle = styled.div``;

const CheckWrap = styled.div`
  display: flex;
  gap: 10px;
`;

const QuestionUpdate = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // useParams로 id 받아옴

  const questionCategorys = ["전체", "배송", "결제", "로그인", "주문", "기타"];
  const [category, setCategory] = useState("전체");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:8088/notice/${id}`)
      .then(function (response) {
        setCategory(response.data.noticeCategory);
        setTitle(response.data.noticeTitle);
        setContent(response.data.noticeContent);
      })
      .catch(function (error) {
        alert("문의 조회에 실패하였습니다", error);
      });
  }, [id]); // id가 변경될 때마다 데이터를 다시 불러옴

  function categoryChangeHandler(e) {
    setCategory(e.target.value);
  }

  function titleChangeHandler(e) {
    setTitle(e.target.value);
  }

  function contentChangeHandler(e) {
    setContent(e.target.value);
  }

  function questionUpdateHandler() {
    if (title === "" || content === "") {
      alert("제목과 내용을 입력해주세요");
    } else {
      axios
        .put(`http://localhost:8088/notice/${id}`, {
          noticeId: id,
          noticeCategory: category,
          noticeTitle: title,
          noticeContent: content,
        })
        .then(function (response) {
          navigate("/cscenter");
        })
        .catch(function (error) {
          alert("문의 수정에 실패하였습니다", error);
        });
    }
  }

  function questionDeleteHandler() {
    axios
      .delete(`http://localhost:8088/notice/${id}`)
      .then(function () {
        alert("문의가 삭제되었습니다");
        navigate("/cscenter"); // 삭제 후 cscenter 페이지로 이동
      })
      .catch(function (error) {
        alert("문의 삭제 중에 오류가 발생했습니다", error);
      });
  }

  return (
    <Main>
      <Title>
        <h3>1:1문의</h3>
      </Title>
      <Content>
        <SubTitle>
          <select
            style={{ textAlign: "center", marginRight: "5px", outline: "none" }}
            onChange={categoryChangeHandler}
            value={category}
          >
            {questionCategorys.map((questionCategory) => (
              <option key={questionCategory} value={questionCategory}>
                {questionCategory}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="제목"
            style={{ outline: "none" }}
            onChange={titleChangeHandler}
            value={title}
          ></input>
        </SubTitle>
        <textarea
          placeholder="내용을 입력해주세요"
          style={{ outline: "none", height: "200px", padding: "10px" }}
          onChange={contentChangeHandler}
          value={content}
        ></textarea>
      </Content>
      <ButtonWrap>
        <Button text={"수정하기"} onClick={questionUpdateHandler}></Button>

        <Button2 onClick={questionDeleteHandler}>삭제하기</Button2>
      </ButtonWrap>
    </Main>
  );
};

export default QuestionUpdate;
