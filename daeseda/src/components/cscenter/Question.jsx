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

const Wrap2 = styled.div`
    border-bottom: 1px solid gray;
    display: flex;
    justify-content: space-between;
`;
const Wrap = styled.div`
    display: flex;
    background-color: #D9D9D9;
    justify-content: space-between;
`;
const P = styled.p`
  width: 90px;
`;
const ButtonWrap = styled.div`
margin: 5px;
display: flex;
justify-content: flex-end;
`;

const Question = () => {
    return (
        <Main>
            <Title>
            <h3>1:1문의</h3>
            </Title>
                <Content>
                <Wrap>
                <P>구분</P>
                <p>제목</p>
                <p>날짜</p>
                </Wrap>
                <Wrap2>
                <P>로그인</P>
                <p>제목</p>
                <p>날짜</p>
                </Wrap2>
                <Wrap2>
                <P>결제</P>
                <p>제목</p>
                <p>날짜</p>
                </Wrap2>
                <Wrap2>
                <P>배송</P>
                <p>제목</p>
                <p>날짜</p>
                </Wrap2>
             
                
                </Content>     
                <ButtonWrap>
                <Button text={"1:1문의하기"}></Button>  
                </ButtonWrap>
                                    
        </Main>
  
    );
  };
  
  export default Question;