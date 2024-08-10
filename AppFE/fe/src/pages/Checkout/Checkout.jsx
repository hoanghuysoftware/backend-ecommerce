import React, { Component } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './checkout.css';
import ApiCustormerService from '../../service/userService';
import ApiCheckOutService from '../../service/checkOutService';
import BackToTop from '../../components/BackToTop/BackToTop';

class Checkout extends Component {
   constructor(props) {
      super(props);
      this.state = {
         name: '',
         selectAddress: '',
         addressList: [],
         phoneNumber: '',
         email: '',
         note: '',
         paymentMethod: '',
         cart: '',
         detailsCart: [],
      };
   }
   handleChange = (e) => {
      const { name, value } = e.target;
      this.setState({ [name]: value });
   };
   handlePaymentMethodChange = (e) => {
      const paymentMethod = e.target.value;
      this.setState({ paymentMethod });
   };
   async componentDidMount() {
      try {
         const data = await ApiCustormerService.getCustomersById(localStorage.getItem('idUser')); // Đang dùng id test của user 5

         this.setState({
            cart: data.cart,
            detailsCart: data.cart.detailsCarts,
            name: data.nameCustomer,
            phoneNumber: data.phoneNumber,
            email: data.emailCus,
            addressList: data.addresses,
         });
         console.log(data);
      } catch (error) {
         console.log('Error getting customers from Checkout: ' + error.message());
      }
   }

   handleSubmit = () => {
      const { note, paymentMethod, detailsCart, selectAddress } = this.state;
      const addressShip = selectAddress;
      const orderDetails = [];
      detailsCart.forEach((item) => {
         orderDetails.push({
            priceOrder: item.priceDetailCart,
            quantityOrder: item.quantityDetailCart,
            idProduct: item.product.id,
         });
      });
      const currentDate = new Date();
      const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}-${(currentDate.getMonth() + 1)
         .toString()
         .padStart(2, '0')}-${currentDate.getFullYear()}`;

      const data = {
         idCustomer: localStorage.getItem('idUser'),
         noteOrder: note,
         statusPay: false,
         payMethod: paymentMethod === 'online' ? 'ONLINE_PAYMENT' : 'DIRECT_PAYMENT',
         dateOrder: formattedDate,
         orderStatus: 0,
         shippingAddress: addressShip,
         orderRequests: orderDetails,
      };

      const methodPayment = this.state.paymentMethod;
      if (methodPayment === 'online') {
         this.handlePaymentOnline(data);
      } else {
         this.handlePaymentOffline(data);
      }
   };

   handlePaymentOffline = async (data) => {
      console.log(data);
   };

   handlePaymentOnline = async (data) => {
      let idOrderNew = 0;
      let totalPriceOrder = 0;
      try {
         const orderData = await ApiCheckOutService.createNewOrder(data);
         console.log(orderData);
         idOrderNew = orderData.id;
         totalPriceOrder = orderData.totalPrice;
      } catch (error) {
         console.log('Loi khi tao don hang tai Checkout: ' + error.message());
      }
      // console.log(idOrderNew + ' ' + totalPriceOrder);

      try {
         const dataCheckOutRequest = await ApiCheckOutService.handleRequestPayment(idOrderNew, totalPriceOrder);
         window.location.href = dataCheckOutRequest;
      } catch (error) {
         console.log('Loi khi yeu cau thanh toan qua vnpay: ' + error.message());
      }
   };
   render() {
      const { name, phoneNumber, email, note, paymentMethod, addressList, detailsCart, cart, selectedAddress } =
         this.state;
      return (
         <div>
            <Header />
            <div className="checkout-main">
               <div className="child-wapper">
                  <div className="checkout-title">
                     <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                           <li className="breadcrumb-item">
                              <a href="/">Trang chủ</a>
                           </li>
                           <li className="breadcrumb-item">
                              <a href="/cart/5">Giỏ hàng</a>
                           </li>
                           <li className="breadcrumb-item active" aria-current="page">
                              Thanh toán
                           </li>
                        </ol>
                     </nav>
                  </div>
                  <div className="checkout-body">
                     <div className="checkout-body-left">
                        <div className="checkout-body-left-content">
                           <h3 className="checkout-body-title">Thông tin thanh toán</h3>
                           <form className="checkout-form">
                              <div className="form-group">
                                 <p htmlFor="name-shipper">Họ và tên:</p>
                                 <input
                                    name="name"
                                    value={name}
                                    type="text"
                                    className="form-control"
                                    id="name-shipper"
                                    readOnly
                                 />
                              </div>
                              <div className="form-group">
                                 <p htmlFor="address-shipper">
                                    Địa chỉ giao hàng:
                                    <span style={{ color: 'red', fontWeight: '800', fontSize: '14px' }}> *</span>
                                 </p>
                                 <select
                                    name="selectAddress"
                                    value={selectedAddress}
                                    onChange={this.handleChange}
                                    className="form-control"
                                    id="address-shipper"
                                 >
                                    <option value="">Chọn địa chỉ</option>
                                    {addressList &&
                                       addressList.map((address, index) => (
                                          <option key={index} value={address.dataAddress}>
                                             {address.dataAddress}
                                          </option>
                                       ))}
                                 </select>
                              </div>
                              <div className="form-group">
                                 <p htmlFor="phone-number-shipper">Số điện thoại:</p>
                                 <input
                                    name="phoneNumber"
                                    value={phoneNumber}
                                    type="text"
                                    className="form-control"
                                    id="phone-number-shipper"
                                    readOnly
                                 />
                              </div>
                              <div className="form-group">
                                 <p htmlFor="email-shipper">E-mail:</p>
                                 <input
                                    name="email"
                                    value={email}
                                    type="text"
                                    className="form-control"
                                    id="email-shipper"
                                    readOnly
                                 />
                              </div>
                              <h3 className="checkout-body-title">Thông tin bổ sung</h3>
                              <div className="form-group" style={{ display: 'block' }}>
                                 <p htmlFor="note-shipper">Ghi chú:</p>
                                 <textarea
                                    name="note"
                                    onChange={this.handleChange}
                                    value={note}
                                    className="form-control"
                                    id="note-shipper"
                                    rows="5"
                                 ></textarea>
                              </div>
                           </form>
                        </div>
                     </div>
                     <div className="checkout-body-right">
                        <div className="checkout-body-right-content">
                           <h3 className="checkout-body-title">Đơn hàng của bạn</h3>
                           <table className="table">
                              <tbody>
                                 <tr className="table-info">
                                    <td className="checkout-table-title">Sản phẩm</td>
                                    <td></td>
                                    <td className="checkout-table-title">Tạm tính</td>
                                 </tr>
                                 {detailsCart.map((item, index) => (
                                    <tr key={index}>
                                       <td className="checkout-name-item" colSpan={2}>
                                          {item.product.nameProduct}
                                       </td>
                                       <td className="checkout-price-item">
                                          {item.product.priceProduct.toLocaleString()}đ x
                                          <span>{item.quantityDetailCart}</span>
                                       </td>
                                    </tr>
                                 ))}
                              </tbody>
                           </table>
                           <div className="checkout-total-price">
                              <div className="checkout-total-title">Tổng</div>
                              <div className="checkout-total-price-content">
                                 {cart && typeof cart.priceCart !== 'undefined'
                                    ? cart.priceCart.toLocaleString() + 'đ'
                                    : 'N/A'}
                              </div>
                           </div>

                           <div className="method-payment-content">
                              <h3 className="checkout-body-title">Phương thức thanh toán</h3>
                              <div className="form-checkout">
                                 <div className="form-check">
                                    <input
                                       className="form-check-input"
                                       type="radio"
                                       name="paymentMethod"
                                       id="checkout-offline"
                                       value="cash"
                                       onChange={this.handlePaymentMethodChange}
                                       checked={paymentMethod === 'cash'}
                                    />
                                    <p className="form-check-label" htmlFor="checkout-offline">
                                       Thanh toán khi nhận
                                    </p>
                                 </div>
                                 <div className="form-check">
                                    <input
                                       className="form-check-input"
                                       type="radio"
                                       name="paymentMethod"
                                       id="checkout-online"
                                       value="online"
                                       onChange={this.handlePaymentMethodChange}
                                       checked={paymentMethod === 'online'}
                                    />
                                    <p className="form-check-label" htmlFor="checkout-online">
                                       Thanh toán trực tuyến
                                    </p>
                                 </div>
                              </div>
                              <button
                                 onClick={this.handleSubmit}
                                 type="button"
                                 className="btn btn-primary btn-checkout"
                              >
                                 Thanh toán
                              </button>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <BackToTop />
            <Footer />
         </div>
      );
   }
}

export default Checkout;
