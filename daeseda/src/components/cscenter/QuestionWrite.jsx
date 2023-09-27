import React from "react";
import styled from "styled-components";
import Button from "../common/Button";
import Check from "../common/Check";

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
`;
const ButtonWrap = styled.div`
    display: flex;
    gap: 4px;
    justify-content: center;
`;
const Button2 = styled.button`
    border: 1px solid gray;
  border-radius: 4px;
  color: gray;
  font-size: 18px;
  padding: 8px 12px;
  text-align: center;
`;
const SubTitle = styled.div`
    
`;
const CheckWrap = styled.div`
    display: flex;
    gap: 10px;
`;


const QuestionWrite = () => {
    return (
        <Main>
            <Title>
            <h3>1:1문의</h3>
            </Title>
            <Content>
                <SubTitle>
                <select>
                <option value="">전체</option>
                <option value="">배송</option>
                <option value="">결제</option>
                <option value="">로그인</option>
                <option value="">주문</option>
                <option value="기타">기타</option>
                </select>
                <input type="text" placeholder="제목"></input>
                </SubTitle>
                <input type="text" placeholder="내용을 입력해주세요"></input>
                <p>공개설정</p>
                <CheckWrap>
                <Check></Check>
                공개
                <Check></Check>
                비공개
                <input type="passward" placeholder="비공개 비밀번호를 입력해주세요"></input>
                </CheckWrap>
                
                </Content>  
                <ButtonWrap>
                <Button text={"문의하기"}></Button>
                
                <Button2>취소하기</Button2> 
                    </ButtonWrap>    
                                 
        </Main>
  
    );
  };
  
  export default QuestionWrite;