import Header from "../../components/common/Header";
import PickupDate from "../../components/laundry/PickupDate";
import Request from "../../components/laundry/Request";
import PriceTag from "../../components/laundry/PriceTag";
import styled from "styled-components";
import { useState } from "react";
function LaundryPage() {
  const [date, setDate] = useState(new Date());
  const [normalLaundry, setNormalLaundry] = useState(false);
  const [specialLaundry, setSpecialLaundry] = useState(false);
  return (
    <div>
      <Header />
      <Layout>
        <Left>
          <PickupDate date={date} setDate={setDate} />
          <Request
            normalLaundry={normalLaundry}
            setNormalLaundry={setNormalLaundry}
            specialLaundry={specialLaundry}
            setSpecialLaundry={setSpecialLaundry}
            date={date}
          />
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
