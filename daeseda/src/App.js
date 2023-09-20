import "./styles/reset.css";
import "./styles/fonts.css";
import Order from "./components/laundry/Order";
import Complete from "./components/laundry/Complete";
import PickupDate from "./components/laundry/PickupDate";
import PriceTag from "./components/laundry/PriceTag";
import Request from "./components/laundry/Request";
import DeliveryDriver from "./components/orderList/DeliveryDriver";
import OrderList from "./components/orderList/OrderList";
import Button from "./components/common/Button";
import Modal from "./components/common/Modal";
function App() {
  return <div>
    <OrderList/>
  </div>;
}

export default App;
