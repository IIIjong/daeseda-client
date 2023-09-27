import React from "react";
import styled from "styled-components";
import Button from "../common/Button";

const Main = styled.div`

`;
const Title = styled.div`
border-bottom: solid 1px grey;
padding: 10px;
`;
const Content = styled.div`
`;
const Questiondiv = styled.div`
float: right;
margin: 10px;
`;
const NoticeTable = styled.table`
  border-bottom: 1px solid #ccc;
`;
const Tr = styled.tr`
border-bottom: 1px solid #ccc;
`;



const Question = () => {
    return (
        <Main>
            <Title>
            <h3>1:1문의</h3>
            </Title>
                <Content>
                <NoticeTable>
                    <Tr>
                    <th scope="col" >구분</th>
                    <th scope="col" >제목</th>
                    <th scope="col" >등록일</th>
                    </Tr>
                
                <Tr>
                <td>결제</td>
                    <th>
                      <a href="#!">개인정보 처리방침 변경안내처리방침</a>
                    </th>
                    <td>2023.07.23</td>
                    </Tr>
                    <Tr>
                <td>배송</td>
                    <th>
                      <a href="#!">개인정보 처리방침 변경안내처리방침</a>
                    </th>
                    <td>2023.07.23</td>
                    </Tr>
                    <Tr>
                <td>로그인</td>
                    <th>
                      <a href="#!">개인정보 처리방침 변경안내처리방침</a>
                    </th>
                    <td>2023.07.23</td>
                    </Tr>
                    </NoticeTable>
                </Content>  
                <Questiondiv>
                    
                <Button text={"1대1문의하기"} /> 
                </Questiondiv>                       
        </Main>
  
    );
  };
  
  export default Question;