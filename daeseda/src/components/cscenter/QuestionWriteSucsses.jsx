import React from "react";
import styled from "styled-components";
import Button from "../common/Button";
import Check from "../../assets/images/check.png";

const MainDiv = styled.div`
  padding-left: 20%;
  padding-right: 20%;
`;
const Input = styled.input`
  width: 70%;
  padding: 10px;
  display: inline-block;
`;
const ShowIdIndex = styled.div`
  padding-left: 20%;
  padding-right: 20%;
  text-align: center;
`;
const Explanation = styled.div`
  border-bottom: solid 1px grey;
`;
const IdBox = styled.div``;
const ShowIdBox = styled.div`
  margin: 50px;
  display: inline-block;
  border-radius: 3px;
`;
const Image = styled.img`
  display: inline-block;
`;
const ButtonBox = styled(Button)``;

const QuestionWriteSucsses = () => {
  return (
    <MainDiv>
      <Explanation>
        <h3>1:1문의</h3>
      </Explanation>

      <ShowIdIndex>
        <IdBox>
          <ShowIdBox>
            <p>문의가 완료됐습니다</p>
            <Image src={Check} alt="" />
          </ShowIdBox>
        </IdBox>
        <ButtonBox text={"홈으로"}></ButtonBox>
      </ShowIdIndex>
    </MainDiv>
  );
};

export default QuestionWriteSucsses;
