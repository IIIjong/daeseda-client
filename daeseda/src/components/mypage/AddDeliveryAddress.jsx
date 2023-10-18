import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import InfoRow from "../common/InfoRow";
import Button from "../common/Button";
import SmallButton from "../common/SmallButton";
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
const Wrap = styled.div`
  display: flex;
  gap: 4px;
`;

const AddDeliveryAddress = ({ modal }) => {
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const [addressName, setAddressName] = useState("");
  const [addressZipcode, setAddressZipcode] = useState("");
  const [addressDetail, setAddressDetail] = useState("");
  const [addressContent, setAddressContent] = useState("");
  const addressInfo = {
    addressName: addressName,
    addressDetail: addressContent + " " + addressDetail,
    addressZipcode: addressZipcode,
  };
  const navigate = useNavigate();

  const searchAddress = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        setAddressZipcode(data.zonecode); // 우편번호 설정
        setAddressContent(data.address); // 주소 설정
      },
    }).open();
  };

  const addAddressHandler = () => {
    const token = localStorage.getItem("token"); // 토큰

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    axios
      .post(`${serverUrl}/users/address/create`, addressInfo, {
        headers,
      })
      .then((response) => {
        // 성공적으로 주소를 추가한 경우
        console.log("주소 추가 성공:", response.data);
        if (!modal) navigate("/myinfo");
        else alert("주소가 추가되었습니다")
      })
      .catch((error) => {
        // 주소 추가 중 에러 발생한 경우
        console.error("주소 추가 실패:", error);
        alert("주소 추가에 실패하였습니다", error)
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
        <Wrap>
          <InfoRow
            label="우편번호"
            type="text"
            id="addressZipcode"
            value={addressZipcode}
            onChange={(e) => setAddressZipcode(e.target.value)}
          />
          <SmallButton
            text="주소 찾기"
            onClick={searchAddress}
            style={{ verticalAlign: "middle" }}
          />
        </Wrap>
        <InfoRow
          label="주소"
          type="text"
          id="addressContent"
          value={addressContent}
          readonly
        />
        <InfoRow
          label="상세 주소"
          type="text"
          id="addressDetail"
          value={addressDetail}
          onChange={(e) => {
            setAddressDetail(e.target.value);
          }}
        />
      </Content>
      <ButtonWrap>
        <Button text="주소 추가" onClick={addAddressHandler} />
      </ButtonWrap>
    </Main>
  );
};

export default AddDeliveryAddress;
