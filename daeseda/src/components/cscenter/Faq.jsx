import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../common/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

const Notice = () => {
  const navigate = useNavigate();
  const [noticeDummy, setNoticeDummy] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8088/notice/list");
        const formattedData = response.data.map((notice) => {
          // 날짜 변환 로직 추가
          const dateObject = new Date(notice.regDate);
          const formattedDate = dateObject.toISOString().split("T")[0];

          // 변환된 날짜를 포함한 객체 반환
          return {
            ...notice,
            regDate: formattedDate,
          };
        });
        setNoticeDummy(formattedData);
      } catch (error) {
        alert("문의 내역을 불러오는 데 실패하였습니다", error);
      }
    };

    fetchData();
  }, []);

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
          <option value="배송">배송</option>
          <option value="결제">결제</option>
          <option value="로그인">로그인</option>
          <option value="주문">주문</option>
          <option value="기타">기타</option>
          <option value="공지사항">공지사항</option>
          <option value="자주묻는질문">자주묻는질문</option>
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
        {noticeDummy
          .filter((notice) => notice.noticeCategory === "자주묻는질문")
          .map((notice) => (
            <Wrap2
              key={notice.noticeId}
              onClick={() => {
                navigate(`${notice.noticeId}`);
              }}
            >
              <P>{notice.noticeCategory}</P>
              <NoticeTitle>{notice.noticeTitle}</NoticeTitle>
              <NoticeDate>{notice.regDate}</NoticeDate>
            </Wrap2>
          ))}
      </Content>
    </Main>
  );
};

export default Notice;
