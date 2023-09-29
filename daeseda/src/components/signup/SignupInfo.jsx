//회원정보 기입

import React from "react";
import styled from "styled-components";
import Button from "../common/Button";
import InfoRow from "../common/InfoRow";

const Main = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
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
  margin-top: 10px;
  padding: 10px;
`;
const ButtonWrap = styled.div`
  display: flex;
  gap: 4px;
  justify-content: center;
`;

const SignupInfo = () => {
  return (
    <Main>
      <Title>
        <h3>회원가입</h3>
      </Title>
      <p>사용하실 개인정보를 모두 입력해 주시길 바랍니다</p>
      <Content>
        <InfoRow label="이름" type="text" id="name" />
        <InfoRow label="닉네임" type="text" id="nickname" />
        <InfoRow label="휴대번호" type="tel" id="phone" />
        <InfoRow label="인증번호" type="text" id="certification" />
        <InfoRow label="이메일 주소" type="email" id="email" />
        <InfoRow label="인증번호" type="text" id="certification" />
        <InfoRow label="비밀번호" type="text" id="passward" />
        <InfoRow label="주소" type="text" id="zipcode" />
        <InfoRow label="상세주소" type="text" id="detailAddress" />
      </Content>
      <ButtonWrap>
        <Button text={"다음"}></Button>
      </ButtonWrap>
    </Main>
  );
};

export default SignupInfo;
