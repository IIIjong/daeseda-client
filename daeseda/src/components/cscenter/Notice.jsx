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
const Search = styled.div`
float: right;
margin: 10px;
`;
const NoticeTable = styled.table`
  border-bottom: 1px solid #ccc;
`;
const Tr = styled.tr`
border-bottom: 1px solid #ccc;
`;


const Notice = () => {
    return (
        <Main>
            <Title>
            <h3>공지사항</h3>
            </Title>
            <Search>
                <select>
                <option value="">전체</option>
                <option value="">배송</option>
                <option value="">결제</option>
                <option value="">로그인</option>
                <option value="">주문</option>
                <option value="기타">기타</option>
                </select>
                <input type="text" placeholder="Search"></input>
                <Button text={"검색"}></Button>
                </Search>
                <Content>
                <NoticeTable>
                    <Tr>
                    <th scope="col" >번호</th>
                    <th scope="col" >제목</th>
                    <th scope="col" >등록일</th>
                    </Tr>
                
                <Tr>
                <td>3</td>
                    <th>
                      <a href="#!">개인정보 처리방침 변경안내처리방침</a>
                    </th>
                    <td>2023.07.13</td>
                    </Tr>
                    <Tr>
                <td>3</td>
                    <th>
                      <a href="#!">개인정보 처리방침 변경안내처리방침</a>
                    </th>
                    <td>2023.07.13</td>
                    </Tr>
                    <Tr>
                <td>3</td>
                    <th>
                      <a href="#!">개인정보 처리방침 변경안내처리방침</a>
                    </th>
                    <td>2023.07.13</td>
                    </Tr>
                    </NoticeTable>
                </Content>                           
        </Main>
  
    );
  };
  
  export default Notice;