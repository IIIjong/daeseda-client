import React from "react";
import styled from "styled-components";
import LoginIcon from "../../assets/images/login.png";
import axios from "axios";
import { Link } from "react-router-dom";
const postData = {
  userEmail: "use234234r@example.com",
  userPassword: "securepassword123",
};
function loginTest() {
  axios
    .post("http://localhost:8088/users/authenticate", postData)
    .then(function (response) {
      console.log("login response:", response);
    })
    .catch(function (error) {
      console.log("login error:", error);
    });
}

const LoginIndex = styled.div`
  text-align: center;
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
  margin: auto;
  padding: 30px;
`;

const Input = styled.input`
  width: 50%;
  padding: 10px;
  margin-top: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
`;
const LoginButton = styled.button`
  width: 150px;
  color: black;
  background: white;
  padding: 5px 0;
  border: 1px ridge #bcbcbc;
  border-radius: 3px;
  outline: none;
`;
const Login = () => {
  return (
    <LoginIndex>
      <Image src={LoginIcon} />
      <br />
      <h1>로그인</h1>
      <br />
      <LoginBox>
        <Input type="text" placeholder="Username" />
        <Input type="password" placeholder="Password" />
        <br />
        <br />
        <LoginButton onClick={loginTest}>로그인</LoginButton>
      </LoginBox>
      <a href="">아이디찾기</a> | <a href="">비밀번호찾기</a> |{" "}
      <Link to="/signup">회원가입</Link>
    </LoginIndex>
  );
};

export default Login;
