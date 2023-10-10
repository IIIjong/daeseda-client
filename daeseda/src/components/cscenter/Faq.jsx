import React from "react";
import styled from "styled-components";
import Button from "../common/Button";
//justify-content: center;
//align-items: center;
//display: flex;
//flex-direction: column;
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
const Search = styled.div`
  margin: 5px;
  display: flex;
  justify-content: flex-end;
`;

const Wrap2 = styled.div`
  border-bottom: 1px solid gray;
  display: flex;
  padding: 4px 8px;
  cursor: pointer;
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

const Faq = () => {
  return (
    <Main>
      <Title>
        <h3>자주묻는질문</h3>
      </Title>
      <Search>
        <select
          style={{ textAlign: "center", marginRight: "5px", outline: "none" }}
        >
          <option value="">전체</option>
          <option value="">배송</option>
          <option value="">결제</option>
          <option value="">로그인</option>
          <option value="">주문</option>
          <option value="기타">기타</option>
        </select>
        <input
          type="text"
          placeholder="Search"
          style={{ outline: "none" }}
        ></input>
        <Button text={"검색"}></Button>
      </Search>
      <Content>
        <Wrap>
          <P>구분</P>
          <NoticeTitle>제목</NoticeTitle>
          <NoticeDate>날짜</NoticeDate>
        </Wrap>
        <Wrap2>
          <P>로그인</P>
          <NoticeTitle>제목</NoticeTitle>
          <NoticeDate>2023-10-10</NoticeDate>
        </Wrap2>
      </Content>
    </Main>
  );
};

export default Faq;
