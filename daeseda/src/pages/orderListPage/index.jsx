import Header from "../../components/common/Header";
import OrderList from "../../components/orderList/OrderList";
function OrderListPage(){
  return(
    <div>
      <Header/>
      <div style={{padding:"0 10%"}}>
      <OrderList/>
      </div>
    </div>
  )
}
export default OrderListPage;