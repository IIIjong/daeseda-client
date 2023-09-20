import React from "react";
import styled from "styled-components";
import Button from "../common/Button";
import Header from "../common/Header";
import User from "../../assets/images/user.png";

const MainDiv = styled.div`
    
`
;
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
    border: solid 1px grey;
    border-radius: 5px
`;
const Image =styled.img`
margin: auto;
margin-top: 100px;
width: 50px;
height: 50px;
`;
const ButtonBox =styled(Button)`
`;

const FindIdShow = () => {
    return (
        <MainDiv>
        <Header></Header>
        <ShowIdIndex>
    
        <Explanation>
        <h3>아이디 찾기</h3>
        </Explanation>
        <IdBox>
        <p>등록된 아이디는 다음과 같습니다</p>
        
        <ShowIdBox>
        예시
        </ShowIdBox>
        <ButtonBox text={" 로그인하기"}>
        
        </ButtonBox>
        </IdBox>
    </ShowIdIndex>
        </MainDiv>
  
    );
  };
  
  export default FindIdShow;