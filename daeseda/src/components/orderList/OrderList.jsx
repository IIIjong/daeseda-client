//주문 내역을 조회하는 컴포넌트(취소하기, 결제하기 페이지, 기사정보 모달, 리뷰작성 모달로 이동 가능)
import { useState, useEffect } from "react";
import styled from "styled-components";
import Modal from "../common/Modal";
import DeliveryDriver from "./DeliveryDriver";
import ReviewWrite from "./ReviewWrite";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

function OrderList() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // 2023-01-01로 오는 데이터를 2023년 01월 01일로 변경
  function formatDate(inputDate) {
    const date = inputDate.split("-");
    return `${date[0]}년 ${date[1]}월 ${date[2]}일`;
  }

  const [orderList, setOrderList] = useState([]);

  const token = localStorage.getItem("token");

  const headers = {
    Authorization: `Bearer ${token}`,
  };
  useEffect(() => {
    axios
      .get("http://localhost:8088/orders/list", { headers })
      .then(function (response) {
        setOrderList(response.data);
        // console.log(response.data);
      })
      .catch(function (error) {
        alert("주문내역 조회 중 오류가 발생했습니다");
        console.log("주문내역 조회 중 오류가 발생했습니다", error);
      });
  }, []);

  // 결제하기 테스트용

  function paymentHandler() {
    const { IMP } = window;
    IMP.init("imp33350778");
    IMP.request_pay(
      {
        pg: "html5_inicis", // PG사 선택 (예: html5_inicis, kakao, uplus, nice, kcp 등)
        pay_method: "card", // 결제 수단 선택 (예: card, vbank, trans 등)
        merchant_uid: "1", // 주문 번호 (고유하게 생성)
        name: "상품명", // 상품명
        amount: 100, // 결제 금액
        buyer_email: "buyer@example.com", // 구매자 이메일
        buyer_name: "구매자 이름", // 구매자 이름
        buyer_tel: "010-1234-5678", // 구매자 전화번호
        buyer_addr: "서욁특별시 강남구", // 구매자 주소
        buyer_postcode: "123-456", // 구매자 우편번호
        m_redirect_url: "https://your-redirect-url.com", // 결제 완료 후 리디렉션 URL
      },
      function (rsp) {
        if (rsp.success) {
          // 결제 성공 시의 처리
          alert("결제가 성공적으로 이루어졌습니다.");
          console.log(rsp)
        } else {
          // 결제 실패 시의 처리
          alert("결제에 실패했습니다. 에러 메시지:" + rsp.error_msg);
          console.log(rsp);
        }
      }
    );
  }

  return (
    <OrderListLayout>
      <Title>주문내역({orderList.length}건)</Title>
      <Table>
        <Header>
          <div style={{ width: "20px", paddingLeft: "50px" }}></div>
          <Number>주문번호</Number>
          <Date>회수날짜</Date>
          <Date>배송날짜</Date>
          <Service>세탁서비스</Service>
          <Price>금액</Price>
          <Status>주문상태</Status>
          <div style={{ width: "100px" }}></div>
        </Header>
        {orderList.length === 0 ? (
          <p>주문한 내역이 없습니다.</p>
        ) : (
          orderList.map((order) => (
            <List key={order.orderId}>
              <FontAwesomeIcon
                icon={faCircleInfo}
                style={{
                  width: "20px",
                  fontSize: "20px",
                  color: "rgb(253,71,85)",
                  paddingLeft: "50px",
                }}
              />
              <Number>{order.orderId}</Number>
              <Date>{formatDate(order.pickupDate)}</Date>
              <Date>{formatDate(order.deliveryDate)}</Date>
              <Service>{order.washingMethod}</Service>
              <Price>{order.totalPrice.toLocaleString()}원</Price>

              <Status>
                {/* 상태 텍스트 수정 필요 */}
                {order.orderStatus === "ORDER"
                  ? "주문 완료"
                  : order.orderStatus === "CASH"
                  ? "결제 대기 중"
                  : order.orderStatus === "COMPLETE"
                  ? "결제 완료"
                  : order.orderStatus === "CANCLE"
                  ? "주문 취소"
                  : null}
              </Status>

              {/* 테스트를 위해 ORDER 상태일 때 리뷰 작성하기가 나오도록 함, 수정 필요 */}
              {order.orderStatus === "ORDER" && (
                <>
                  {/* <StatusButton onClick={openModal}>리뷰 쓰기</StatusButton>
                  <Modal isOpen={isModalOpen} onClose={closeModal}>
                    <ReviewWrite orderId={order.orderId} />
                  </Modal> */}
                  <button onClick={paymentHandler}>테스트용 결제하기</button>
                </>
              )}
            </List>
          ))
        )}
      </Table>
    </OrderListLayout>
  );
}

const OrderListLayout = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 24px;
`;

const Title = styled.h3`
  margin: 20px 0;
  border-bottom: solid 1px rgb(232, 234, 237);
  padding: 10px;
`;

const Table = styled.section`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Header = styled.header`
  display: flex;
  font-size: 16px;
  font-weight: 500;
  border-bottom: 1px solid rgb(232, 234, 237);
  padding-bottom: 20px;
`;

const List = styled.article`
  display: flex;
  font-size: 16px;
  border-bottom: 0.5px solid rgb(232, 234, 237);
  padding: 5px 0;
`;

const Number = styled.p`
  width: 200px;
  text-align: center;
`;

const Date = styled.p`
  width: 150px;
  text-align: center;
`;

const Service = styled.p`
  width: 150px;
  text-align: center;
`;

const Price = styled.p`
  width: 150px;
  text-align: center;
`;

const Status = styled.p`
  width: 150px;
  text-align: center;
`;

const StatusButton = styled.button`
  width: 100px;
  text-align: center;
  font-size: 16px;
  color: rgb(253, 71, 85);
  box-sizing: border-box;
`;

export default OrderList;
