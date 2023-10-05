import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "../common/Button";
import Check from "../common/Check";
import { useNavigate } from "react-router-dom";
import WarningMessage from "../common/WarningMessage";

const Main = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
const Title = styled.div`
  border-bottom: solid 1px rgb(232, 234, 237);
  padding: 10px;
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 10px;
`;
const ButtonWrap = styled.div`
  display: flex;
  gap: 4px;
  justify-content: center;
`;

const Agree = styled.div`
  border: 1px solid gray;
  margin-bottom: 10px;
  padding: 10px;
`;
const CheckWrap = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const Signup = () => {
  //이용약관을 동의했는지 state값으로 유지
  const [firstTerms, setFirstTerms] = useState(false);
  const [firstTermsValidation, setFirstTermsValidation] = useState(true);
  const [secondTerms, setSecondTerms] = useState(false);
  const [secondTermsValidation, setSecondTermsValidation] = useState(true);

  const navigate = useNavigate();
  //이용약관을 모두 동의했으면 다음 버튼 클릭 시 info로 이동, 가입할 회원의 정보를 입력함
  function nextButton() {
    if (firstTerms) setFirstTermsValidation(true);
    else setFirstTermsValidation(false);
    if (secondTerms) setSecondTermsValidation(true);
    else setSecondTermsValidation(false);

    if (firstTerms && secondTerms) navigate("info");
  }
  return (
    <Main>
      <Title>
        <h3>회원가입</h3>
      </Title>
      <Content>
        <CheckWrap>
          <Check
            onClick={() => {
              setFirstTerms(!firstTerms);
            }}
          />
          <p>1. 서비스 이용</p>
          {firstTermsValidation ? null : (
            <WarningMessage text="서비스 이용에 동의하세요" />
          )}
        </CheckWrap>
        <Agree>
          <p> 1.1. 회원은 회사의 세탁 예약 서비스를 이용할 수 있습니다.</p>
          <p>
            1.2. 회원은 본 서비스를 이용함에 있어 모든 적용 가능한 법률, 규정 및
            약관을 준수해야 합니다.
          </p>
          <p>
            1.3. 회원은 개인 정보를 정확하게 제공해야 하며, 다른 회원의 개인
            정보를 무단으로 수집, 저장 또는 공유해서는 안됩니다.
          </p>
        </Agree>
      </Content>

      <Content>
        <CheckWrap>
          <Check
            onClick={() => {
              setSecondTerms(!secondTerms);
            }}
          />
          <p>2. 예약 및 결제</p>
          {secondTermsValidation ? null : (
            <WarningMessage text="예약 및 결제에 동의하세요" />
          )}
        </CheckWrap>
        <Agree>
          <p>
            2.1. 회원은 서비스를 통해 세탁 예약을 생성하고 결제할 수 있습니다.
          </p>
          <p>
            2.2. 결제가 이루어진 후, 예약은 취소 또는 변경이 일부 제한될 수
            있습니다. 취소 및 환불 정책은 서비스 내에서 확인할 수 있습니다.
          </p>
        </Agree>
      </Content>

      <ButtonWrap>
        <Button text={"다음"} onClick={nextButton} />
      </ButtonWrap>
    </Main>
  );
};

export default Signup;
