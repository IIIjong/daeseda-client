import React, { useState } from "react";
import styled from "styled-components";
import LoginIcon from "../../assets/images/login.png";
import axios from "axios";
import { Link } from "react-router-dom";

const LoginIndex = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const Image = styled.img`
  margin: auto;
  width: 50px;
  height: 50px;
`;
const LoginBox = styled.div`
  background-color: #5d8df2;
  border-radius: 35px;
  height: 150px;
  width: 400px;
  margin: 10px auto;
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const Input = styled.input`
  width: 50%;
  padding: 10px;
  border: 1px solid rgb(232, 234, 237);
  border-radius: 3px;
`;
const LoginButton = styled.button`
  width: 150px;
  color: black;
  background: white;
  padding: 5px 0;
  border: 1px ridge rgb(232, 234, 237);
  border-radius: 3px;
  outline: none;
  margin-top:20px;
`;

const BottomButton = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  function emailChangeHandler(e) {
    setEmail(e.target.value);
  }
  function passwordChangeHandler(e) {
    setPassword(e.target.value);
  }
  const loginInfo = {
    userEmail: email,
    userPassword: password,
  };
  function loginHandler() {
    axios
      .post("http://localhost:8088/users/authenticate", loginInfo)
      .then(function (response) {
        console.log("login response:", response);
      })
      .catch(function (error) {
        console.log("login error:", error);
      });
  }
  return (
    <LoginIndex>
      <Image src={LoginIcon} />

      <h1>로그인</h1>
      <LoginBox>
        <Input
          type="text"
          placeholder="Email"
          onChange={emailChangeHandler}
          value={email}
        />
        <Input
          type="password"
          placeholder="Password"
          onChange={passwordChangeHandler}
          value={password}
        />
        <LoginButton onClick={loginHandler}>로그인</LoginButton>
      </LoginBox>
      <BottomButton>
        <Link to="">아이디찾기</Link>
        <Link to="">비밀번호찾기</Link>
        <Link to="/signup">회원가입</Link>
      </BottomButton>
    </LoginIndex>
  );
};

export default Login;
