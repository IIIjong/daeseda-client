import React from "react";
import styled from "styled-components";
import Button from "../common/Button";
import Header from "../common/Header";
import User from "../../assets/images/user.png";

const MainDiv = styled.div`
    
`
;
const Input = styled.input`
  width: 70%;
  padding: 10px;
  display: inline-block
`;
const ShowIdIndex = styled.div`
    padding-left: 20%;
  padding-right: 20%;
  
  
`;
const Explanation = styled.div`
    border-bottom: solid 1px grey;
`;
const IdBox = styled.div`
    
`;
const ShowIdBox =styled.div`
    margin: 50px;
    padding: 10px;
    display: inline-block;
    border: 1px solid #ccc;
  border-radius: 3px;
`;
const Image =styled.img`
width: 10%; // 이미지를 컨테이너에 맞추기 위해 너비 100%로 설정
  
  display: inline-block
`;
const ButtonBox =styled(Button)`
`;

const FindIdShow = () => {
    return (
        <MainDiv>
        <Header></Header>
        <ShowIdIndex>
    
        <Explanation>
        <h3>아이디찾기</h3>
        </Explanation>
        <IdBox>
        <p>등록된 아이디는 다음과 같습니다</p>
        
        <ShowIdBox>
        <Image src={User} alt=""/>
        아이디 123123
        </ShowIdBox>
        
        </IdBox>
        <ButtonBox text={"로그인"}>
        
        </ButtonBox>
    </ShowIdIndex>
        </MainDiv>
  
    );
  };
  
  export default FindIdShow;