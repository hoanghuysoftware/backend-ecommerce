import React, { Component } from 'react';
import './pay-success.css';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import ApiCheckOutService from '../../service/checkOutService';

class PaySuccess extends Component {
   constructor(props) {
      super(props);
      this.state = {
         totalPricePay: '',
         orderDate: '',
         idOrder: '',
         responseStatus: '',
         payment: true,
      };
   }
   async componentDidMount() {
      const urlParams = new URLSearchParams(window.location.search);
      const totalPricePay = parseInt(urlParams.get('vnp_Amount')) / 100;
      const responseStatus = urlParams.get('vnp_ResponseCode');
      const orderInfo = urlParams.get('vnp_OrderInfo');
      const orderDate = urlParams.get('vnp_PayDate');
      const dateFormat = `${orderDate.substring(6, 8)}/${orderDate.substring(4, 6)}/${orderDate.substring(0, 4)}`;
      const idOrder = orderInfo.substring(orderInfo.lastIndexOf(' ') + 1);
      this.setState({
         totalPricePay: totalPricePay,
         responseStatus: responseStatus,
         orderDate: dateFormat,
         idOrder: idOrder,
      });
      if (responseStatus === '00') {
         try {
            await ApiCheckOutService.updateOrderStatusPay(idOrder, 1);
         } catch (error) {
            console.log('Loi khi update trang thai thanh toan cho don hang: ' + error.message());
         }
      } else {
         this.setState({
            payment: false,
         });
      }
   }

   render() {
      const { totalPricePay, orderDate, idOrder } = this.state;
      return (
         <div className="pay-success-main">
            <div className="pay-success-body-wapper">
               <div className="pay-success-header">
                  <img src="/tick.png" alt="tick-success-payment" />
                  <h3 className="pay-title">Thanh toán thành công</h3>
               </div>
               <div className="pay-success-body">
                  <p>
                     Xin chào, <span style={{ fontWeight: '500' }}></span>
                     <p>Giao dịch của bạn đã thành công!</p>
                  </p>
                  <div className="pay-success-body-detail">
                     <h5>Chi tiết thanh toán:</h5>
                     <p>
                        Số tiền: <span style={{ fontWeight: '500' }}>{parseInt(totalPricePay).toLocaleString()}đ</span>
                        <p>
                           Mã đơn hàng: <span style={{ fontWeight: '500' }}>{idOrder}</span>
                        </p>
                     </p>
                     <p>Chúng tôi khuyên bạn nên lưu lại thông tin này để tham khảo trong tương lai.</p>
                  </div>
               </div>
               <div className="pay-success-bottom">
                  <p>
                     Ngày đặt hàng: <span style={{ fontWeight: '500' }}>{orderDate}</span>
                  </p>
                  <Link to={`/orders/${5}`} type="button" className="btn btn-success">
                     Theo dõi đơn hàng
                  </Link>
               </div>
            </div>
         </div>
      );
   }
}

export default PaySuccess;
