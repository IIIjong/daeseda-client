import styled from "styled-components";
import axios from "axios";
import { useState, useEffect } from "react";
function DeliveryDetail({ orderId }) {
  const serverUrl = process.env.REACT_APP_SERVER_URL;

  const token = localStorage.getItem("token");

  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const [deliveryStatus, setDeliveryStatus] = useState("");
  const [addressZipcode, setAddressZipcode] = useState("");
  const [addressRoad, setAddressRoad] = useState("");
  const [addressDetail, setAddressDetail] = useState("");
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    axios
      .get(`${serverUrl}/delivery/tracking?order=${orderId}`, { headers })
      .then(function (response) {
        if (response.data != "") {
          setDeliveryStatus(response.data.deliveryStatus);
          setAddressZipcode(response.data.address.addressZipcode);
          setAddressRoad(response.data.address.addressRoad);
          setAddressDetail(response.data.address.addressDetail);
          setName(response.data.user.userName);
          setNickname(response.data.user.userNickname);
          setPhone(response.data.user.userPhone);
        }
      })
      .catch(function (error) {
        alert("배송 정보를 받아오는 데 실패하였습니다");
        console.log(error);
      });
  }, []);

  return (
    <Layout>
      <Title>{nickname}님의 배송 내역</Title>
      <Row>
        <RowTitle>주문번호</RowTitle>
        <p>{orderId}</p>
      </Row>

      <Row>
        <RowTitle>배송주소</RowTitle>
        <p>
          ({addressZipcode}) {addressRoad} {addressDetail}
        </p>
      </Row>

      <Row>
        <RowTitle>배송상태</RowTitle>
        {deliveryStatus === "READY" ? (
          <p>배송 준비 중</p>
        ) : deliveryStatus === "START" ? (
          <p>배송 중</p>
        ) : deliveryStatus === "END" ? (
          <p>배송 완료</p>
        ) : null}
      </Row>

      <Row>
        <RowTitle>주문자이름(닉네임)</RowTitle>
        <p>
          {name}({nickname})
        </p>
      </Row>
      <Row>
        <RowTitle>주문자번호</RowTitle>
        <p>{phone}</p>
      </Row>
    </Layout>
  );
}

const Layout = styled.section`
  display: flex;
  flex-direction: column;
  width: 500px;
  gap: 10px;
  font-size: 16px;
`;

const Title = styled.p`
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 10px;
`;

const Row = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const RowTitle = styled.p`
  border: 1px solid rgb(232, 234, 237);
  background-color: black;
  color: white;
  padding: 4px;
  border-radius: 4px;
`;

const Half = styled.p`
  width: 200px;
`;

export default DeliveryDetail;
