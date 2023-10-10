import React from "react";
import styled from "styled-components";
import Button from "../common/Button";
import { useNavigate } from "react-router-dom";

const Main = styled.div`
  display: flex;
  flex-direction: column;
`;
const Title = styled.div`
  border-bottom: solid 1px grey;
  padding: 10px;
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

const Wrap2 = styled.div`
  border-bottom: 1px solid gray;
  display: flex;
  padding: 4px 8px;
`;
const Wrap = styled.div`
  display: flex;
  background-color: #d9d9d9;
  padding: 4px 8px;
`;
const P = styled.p`
  width: 10%;
`;

const NoticeTitle = styled.p`
  width: 80%;
`;
const NoticeDate = styled.p`
  width: 10%;
`;

const ButtonWrap = styled.div`
  margin: 5px;
  display: flex;
  justify-content: flex-end;
`;

const Question = () => {
  const navigate = useNavigate();
  return (
    <Main>
      <Title>
        <h3>1:1문의</h3>
      </Title>
      <Content>
        <Wrap>
          <P>구분</P>
          <NoticeTitle>제목</NoticeTitle>
          <NoticeDate>날짜</NoticeDate>
        </Wrap>
        <Wrap2>
          <P>로그인</P>
          <NoticeTitle>제목</NoticeTitle>
          <NoticeDate>날짜</NoticeDate>
        </Wrap2>
      </Content>
      <ButtonWrap>
        <Button
          text={"1:1문의하기"}
          onClick={() => {
            navigate("question-write");
          }}
        ></Button>
      </ButtonWrap>
    </Main>
  );
};

export default Question;
