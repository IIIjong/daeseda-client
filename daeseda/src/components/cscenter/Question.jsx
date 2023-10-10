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
        <h3>1:1문의</h3>
      </Title>
      <Content>
        <Wrap>
          <P>구분</P>
          <NoticeTitle>제목</NoticeTitle>
          <NoticeDate>날짜</NoticeDate>
        </Wrap>
        {noticeDummy.map((notice) => (
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
