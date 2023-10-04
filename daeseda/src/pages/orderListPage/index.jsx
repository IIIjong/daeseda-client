import Header from "../../components/common/Header";
import OrderList from "../../components/orderList/OrderList";
function OrderListPage(){
  return(
    <div>
      <Header/>
      <div style={{padding:"0 20px"}}>
      <OrderList/>
      </div>
    </div>
  )
}
export default OrderListPage;