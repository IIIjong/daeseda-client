//회원정보 기입
import React from "react";
import styled from "styled-components";
import Button from "../common/Button";
import InfoRow from "../common/InfoRow";
import { useState } from "react";
import axios from "axios";
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
`;
const ButtonWrap = styled.div`
  display: flex;
  gap: 4px;
  justify-content: center;
`;

const SignupInfo = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const signupInfo = {
    userEmail: email,
    userName: name,
    userNickname: nickname,
    userPhone: phone,
    userPassword: password,
  };
  const navigate = useNavigate();
  function signupButton() {
    axios
      .post(`http://localhost:8088/users/signup`, signupInfo)
      .then(function (response) {
        navigate("/signup/success");
      })
      .catch(function (error) {
        alert(`회원가입 오류: ${error}`);
      });
  }

  return (
    <Main>
      <Title>
        <h3>회원가입</h3>
      </Title>
      <Content>
        <InfoRow
          label="이름"
          type="text"
          id="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <InfoRow
          label="닉네임"
          type="text"
          id="nickname"
          value={nickname}
          onChange={(e) => {
            setNickname(e.target.value);
          }}
        />
        <InfoRow
          label="휴대폰번호"
          type="tel"
          id="phone"
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
          }}
        />
        {/* <InfoRow label="인증번호" type="text" id="certification" /> */}
        <InfoRow
          label="이메일 주소"
          type="email"
          id="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        {/* <InfoRow label="인증번호" type="text" id="certification" /> */}
        <InfoRow
          label="비밀번호"
          type="text"
          id="passward"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        {/* <InfoRow label="주소" type="text" id="zipcode" /> */}
        {/* <InfoRow label="상세주소" type="text" id="detailAddress" /> */}
      </Content>
      <ButtonWrap>
        <Button text={"다음"} onClick={signupButton}></Button>
      </ButtonWrap>
    </Main>
  );
};

export default SignupInfo;
