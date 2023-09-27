//회원가입 약관 동의

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
    margin-top: 10px;
    padding: 10px;
`;
const ButtonWrap = styled.div`
    display: flex;
    gap: 4px;
    justify-content: center;
`;

const Agree = styled.div`
    border: 1px solid gray;
    height: 300px;
    margin-bottom: 10px;
    padding: 10px;
`;
const CheckWrap = styled.div`
    display: flex;
    gap: 10px;
    margin-top: 10px;
`;


const Signup = () => {
    return (
        <Main>
            <Title>
            <h3>회원가입</h3>
            </Title>
            <p>아래 약관에 동의해주시길 바랍니다</p>
            <Content>
                <CheckWrap>
                <Check></Check>
                <p>[필수] 약관동의서</p>
                </CheckWrap>
           <Agree>
            동의하세요
            동의하세요동의하세요동의하세요동의하세요
            동의하세요동의하세요
           </Agree>
             
                <CheckWrap>
                <Check></Check>
                <p>[선택] 약관동의서</p>
                </CheckWrap>
                <Agree>
                동의하세요
            동의하세요동의하세요동의하세요동의하세요
            동의하세요동의하세요
           </Agree>
                </Content>  
                <ButtonWrap>
                <Button text={"다음"}></Button>
                    </ButtonWrap>    
                                 
        </Main>
  
    );
  };
  
  export default Signup;