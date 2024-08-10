import React, { Component } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './order-detail.css';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import ApiCheckOutService from '../../service/checkOutService';
import ApiCustormerService from '../../service/userService';

class OrderDetails extends Component {
   constructor(props) {
      super(props);
      this.state = {
         idDonHang: this.props.match.params.id,
         idCustomer: localStorage.getItem('idUser'),
         donHang: '',
         customer: '',
      };
   }
   async componentDidMount() {
      try {
         const data = await ApiCheckOutService.getOrderById(this.state.idDonHang);
         this.setState({ donHang: data });
      } catch (error) {
         console.log(`Loi khi lay don hang theo id tai OrderDetail: ${error.message}`);
      }
      try {
         const dataUser = await ApiCustormerService.getCustomersById(this.state.idCustomer);
         this.setState({ customer: dataUser });
      } catch (error) {
         console.log(`Loi khi lay khach hang theo id tai order detail: ${error.message}`);
      }
   }
   tranferStatuENGToVN(status) {
      switch (status) {
         case 'DELIVERED':
            return <span style={{ color: '#48D1CC' }}>Đang giao hàng</span>;
         case 'PENDING':
            return <span style={{ color: '#007BFF' }}>Đang chờ xử lý</span>;
         case 'PROCESSING':
            return <span style={{ color: '#9370DB' }}>Đang xử lý</span>;
         case 'CANCELLED':
            return <span style={{ color: '#B22222' }}>Đang hủy</span>;
         case 'SHIPPED':
            return <span style={{ color: '#FF8C00' }}>Đã giao</span>;
         default:
            return `N/A`;
      }
   }
   render() {
      const { idDonHang, donHang, customer, idCustomer } = this.state;
      const listProduct = donHang.detailsOrders;

      return (
         <div>
            <Header />
            <div className="order-detail-main">
               <nav aria-label="breadcrumb" style={{ marginTop: '0px' }}>
                  <ol className="breadcrumb">
                     <li className="breadcrumb-item">
                        <Link to="/">Trang chủ</Link>
                     </li>
                     <li className="breadcrumb-item">
                        <Link to={`/orders/${idCustomer}`}>Lịch sửa mua hàng</Link>
                     </li>
                     <li className="breadcrumb-item active" aria-current="page">
                        Chi tiết đơn hàng
                     </li>
                  </ol>
               </nav>
               <div className="child-wapper">
                  <div className="order-detail-container">
                     <div className="order-detail-top">
                        <Link to={`/orders/5`} type="button" className="btn btn-secondary btn-back-order-detail">
                           <i className="fa-solid fa-arrow-left"></i>
                           Trở về
                        </Link>

                        <div className="order-detail-title">
                           <div className="order-detail-id">
                              <strong>Mã đơn hàng: </strong> {idDonHang}
                           </div>
                           <div className="order-detail-status">{this.tranferStatuENGToVN(donHang.orderStatus)}</div>
                        </div>
                     </div>
                     <div className="order-detail-body">
                        <div className="detail-body-info-customer">
                           <h3 className="detail-body-title">Địa chỉ nhận hàng</h3>
                           <h5 className="detail-body-name-cus">{customer.nameCustomer}</h5>
                           <p className="detail-body-phone">
                              (+84) {customer.phoneNumber !== undefined && customer.phoneNumber.slice(1)}
                           </p>
                           <p className="detail-body-address">{donHang.shippingAddress}</p>
                        </div>
                        <div className="detail-body-info-order">
                           <h3 className="detail-body-title">Thông tin đơn hàng</h3>
                           <div className="detail-body-list">
                              {listProduct !== undefined &&
                                 listProduct.map((item, index) => (
                                    <div key={index} className="detail-body-item">
                                       <div className="detail-body-item-img">
                                          <div
                                             className="detail-body-item-img-data"
                                             style={{
                                                backgroundImage: `url(data:image/jpeg;base64,${item.product.images[0].imageData}`,
                                             }}
                                          ></div>
                                       </div>
                                       <div className="detail-body-item-info">
                                          <div className="detail-body-item-info-name">{item.product.nameProduct}</div>
                                          <div className="detail-body-item-info-quantity">
                                             x{item.quantityDetailsOrder}
                                          </div>
                                       </div>
                                       <div className="detail-body-item-price">
                                          {item.priceDetailsOrder.toLocaleString()}đ
                                       </div>
                                    </div>
                                 ))}
                           </div>
                        </div>
                     </div>
                     <div className="order-detail-bottom">
                        <table className="table">
                           <tbody>
                              <tr className="detail-table">
                                 <td className="detail-table-title">Ngày đặt hàng</td>
                                 <td className="detail-table-data">{donHang.dateOrder}</td>
                              </tr>
                              <tr className="detail-table">
                                 <td className="detail-table-title">Tổng tiền hàng</td>
                                 <td className="detail-table-data">
                                    {donHang.totalPrice !== undefined && donHang.totalPrice.toLocaleString()}đ
                                 </td>
                              </tr>
                              <tr className="detail-table">
                                 <td className="detail-table-title">Tổng số lượng</td>
                                 <td className="detail-table-data">{donHang.totalQuantity}</td>
                              </tr>
                              <tr className="detail-table">
                                 <td className="detail-table-title">Thành tiền</td>
                                 <td className="detail-table-data">
                                    {donHang.totalPrice !== undefined && donHang.totalPrice.toLocaleString()}đ
                                 </td>
                              </tr>
                              <tr className="detail-table">
                                 <td className="detail-table-title">
                                    <i style={{ marginRight: '5px' }} className="fa-regular fa-credit-card"></i>
                                    Phương thức thanh toán
                                 </td>
                                 {donHang.paymentMethod !== undefined &&
                                 donHang.paymentMethod.nameMethod === 'ONLINE_PAYMENT' ? (
                                    <td className="detail-table-data">Thanh toán online</td>
                                 ) : (
                                    <td className="detail-table-data">Thanh toán khi nhận</td>
                                 )}
                              </tr>
                              <tr className="detail-table">
                                 <td className="detail-table-title">Ghi chú (*)</td>
                                 <td className="detail-table-data">{donHang.noteOrder}</td>
                              </tr>
                           </tbody>
                        </table>
                     </div>
                  </div>
               </div>
            </div>
            <Footer />
         </div>
      );
   }
}

export default OrderDetails;
