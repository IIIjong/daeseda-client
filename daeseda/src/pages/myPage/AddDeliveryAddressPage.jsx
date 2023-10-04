import styled from "styled-components";
import Header from "../../components/common/Header";
import Sidebar from "../../components/mypage/Sidebar";
import AddDeliveryAddress from "../../components/mypage/AddDeliveryAddress";
import { useState } from "react";
function AddDeliveryAddressPage() {
  const [selectedItemId, setSelectedItemId] = useState("delivery");
  return (
    <div>
      <Header />
      <GridLayout>
        <Sidebar
          selectedItemId={selectedItemId}
          setSelectedItemId={setSelectedItemId}
        />
        <AddDeliveryAddress />
      </GridLayout>
    </div>
  );
}

const GridLayout = styled.div`
  display: grid;
  grid-template-columns: 220px auto;
  padding: 0 20px;
`;
export default AddDeliveryAddressPage;
