import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import InfoRow from "../common/InfoRow";
import Button from "../common/Button";
import axios from "axios";

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
  margin-top: 10px;
  padding: 10px;
`;

const ButtonWrap = styled.div`
  display: flex;
  gap: 4px;
  justify-content: center;
`;

const AddDeliveryAddress = () => {
  const [addressName, setAddressName] = useState("");
  const [addressZipcode, setAddressZipcode] = useState("");
  const [addressDetail, setAddressDetail] = useState("");

  const addressInfo = {
    addressName,
    addressZipcode,
    addressDetail,
  };
  const navigate = useNavigate();
  const addAddressHandler = () => {
    const token = localStorage.getItem("token"); // 로컬 스토리지에서 토큰을 가져옵니다.

    const headers = {
      Authorization: `Bearer ${token}`, // Authorization 헤더에 토큰을 추가합니다.
    };

    axios
      .post("http://localhost:8088/users/address/create", addressInfo, {
        headers, // 요청 헤더에 토큰을 추가합니다.
      })
      .then((response) => {
        // 성공적으로 주소를 추가한 경우
        console.log("주소 추가 성공:", response.data);
        // 추가 완료 후 어떤 처리를 할 수 있습니다.
        navigate("/mypage/"); // 주소 추가 완료 후 리디렉션할 경로를 지정합니다.
      })
      .catch((error) => {
        // 주소 추가 중 에러 발생한 경우
        console.error("주소 추가 실패:", error);
        // 에러 처리 로직을 추가할 수 있습니다.
      });
  };

  return (
    <Main>
      <Title>
        <h3>주소 추가</h3>
      </Title>
      <Content>
        <InfoRow
          label="주소 이름"
          type="text"
          id="addressName"
          value={addressName}
          onChange={(e) => setAddressName(e.target.value)}
        />
        <InfoRow
          label="우편번호"
          type="text"
          id="addressZipcode"
          value={addressZipcode}
          onChange={(e) => setAddressZipcode(e.target.value)}
        />
        <InfoRow
          label="상세 주소"
          type="text"
          id="addressDetail"
          value={addressDetail}
          onChange={(e) => setAddressDetail(e.target.value)}
        />
      </Content>
      <ButtonWrap>
        <Button text="주소 추가" onClick={addAddressHandler} />
      </ButtonWrap>
    </Main>
  );
};

export default AddDeliveryAddress;
