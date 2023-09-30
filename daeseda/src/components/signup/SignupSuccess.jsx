//회원가입 성공
//회원정보 기입

import React from "react";
import styled from "styled-components";
import Button from "../common/Button";
import Check from "../../assets/images/check.png";
import { useNavigate } from "react-router-dom";
const Main = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
const Title = styled.div`
  border-bottom: solid 1px rgb(232, 234, 237);
  padding: 10px;
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 10px;
  padding: 10px;
  align-items: center;
`;
const ButtonWrap = styled.div`
  display: flex;
  gap: 4px;
  justify-content: center;
`;
const Image = styled.img`
  width: 5%;
`;

const SignupSuccess = () => {
  const navigate = useNavigate();
  return (
    <Main>
      <Title>
        <h3>회원가입</h3>
      </Title>
      <Content>
        <p>환영합니다 회원가입이 완료됐습니다</p>
        <Image src={Check} alt="" />
      </Content>
      <ButtonWrap>
        <Button
          text={"로그인하기"}
          onClick={() => {
            navigate("/login");
          }}
        ></Button>
      </ButtonWrap>
    </Main>
  );
};

export default SignupSuccess;
