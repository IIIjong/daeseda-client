import Header from "../../components/common/Header";
import PickupDate from "../../components/laundry/PickupDate";
import Request from "../../components/laundry/Request";
import PriceTag from "../../components/laundry/PriceTag";
import styled from "styled-components";
function LaundryPage() {
  return (
    <div>
      <Header />
      <Layout>
        <Left>
          <PickupDate />
          <Request />
        </Left>
        <PriceTag />
      </Layout>
    </div>
  );
}

const Layout = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 0 20%;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export default LaundryPage;
