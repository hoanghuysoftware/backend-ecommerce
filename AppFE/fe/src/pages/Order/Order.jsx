import React, { Component } from 'react';
import './index.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import ApiCheckOutService from '../../service/checkOutService';
import ModalReview from '../../components/ModalReview/ModalReview';
import ApiReviewService from '../../service/reviewService';

class Order extends Component {
   constructor(props) {
      super(props);
      this.state = {
         idCustomer: localStorage.getItem('idUser'),
         orderList: [],
         search: '',
         orderFillter: [],
         showAlert: false,
         showModal: false,
         orderInput: '',
         existsReview: [],
      };
   }
   handleInputChange = (event) => {
      this.setState({ search: event.target.value });
   };
   async componentDidMount() {
      try {
         const data = await ApiCheckOutService.getOrderByIdCustomer(this.state.idCustomer);
         const dataReverse = data.reverse();

         const promises = dataReverse.map(async (item) => {
            const checkReview = await ApiReviewService.checkExistsReviewOfOrder(item.id);
            return checkReview ? item.id : null;
         });
         const results = await Promise.all(promises);
         const existsReview = results.filter((id) => id !== null);

         this.setState({ existsReview });
         this.setState({ orderList: dataReverse });
      } catch (error) {
         console.log(`Loi khi lay don hang theo id khach hang tai order: ${error.message}`);
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
   handleSubmitSearch = (e) => {
      e.preventDefault();
      const { search, orderList } = this.state;
      const orderFillter = orderList.filter((order) => order.id === parseInt(search));
      this.setState({ orderFillter });
      if (orderFillter.length === 0) {
         this.setState({ showAlert: true });
         setTimeout(() => {
            this.setState({ showAlert: false });
         }, 3000);
      }
   };
   handleClickReview = (order) => {
      this.setState({ showModal: true, orderInput: order });
   };

   render() {
      const { orderList, idCustomer, search, orderFillter, showAlert, showModal, orderInput, existsReview } =
         this.state;
      if (showModal) return <ModalReview data={orderInput} />;
      return (
         <div>
            <Header />
            <div className="order-main">
               <nav aria-label="breadcrumb" style={{ marginTop: '0px' }}>
                  <ol className="breadcrumb">
                     <li className="breadcrumb-item">
                        <Link to="/">Trang chủ</Link>
                     </li>
                     <li className="breadcrumb-item active" aria-current="page">
                        Lịch sử đơn hàng
                     </li>
                  </ol>
               </nav>
               <div className="child-wapper">
                  <div className="order-container">
                     <div className="order-top" style={{ position: 'relative' }}>
                        <h2 className="order-title">Lịch sửa mua hàng</h2>
                        <div className="order-top-control">
                           <div className="d"></div>
                           {showAlert && (
                              <div
                                 className="alert alert-danger"
                                 role="alert"
                                 style={{ position: 'absolute', right: '11%', top: '5%' }}
                              >
                                 Không tìm thấy đơn hàng
                              </div>
                           )}
                           <div className="order-search">
                              <i className="fa-solid fa-magnifying-glass"></i>
                              <form onSubmit={this.handleSubmitSearch}>
                                 <input
                                    onChange={this.handleInputChange}
                                    value={search}
                                    name="searchContent"
                                    type="text"
                                    placeholder="Tìm theo id"
                                 />
                              </form>
                           </div>
                        </div>
                     </div>
                     <div className="order-center">
                        <div className="order-center-main">
                           {orderFillter.length !== 0
                              ? orderFillter.map((order, index) => (
                                   <div key={index} className="order-list">
                                      <div className="order-item-top">
                                         <div className="order-item-top-id">ID đơn hàng: {order.id}</div>
                                         <div className="order-item-top-status">
                                            {this.tranferStatuENGToVN(order.orderStatus)}
                                         </div>
                                      </div>
                                      {order.detailsOrders.map((item, index2) => (
                                         <div key={index2} className="order-item">
                                            <div className="order-item-img">
                                               <div
                                                  className="order-item-img-data"
                                                  style={{
                                                     backgroundImage: `url(data:image/jpeg;base64,${item.product.images[0].imageData}`,
                                                  }}
                                               ></div>
                                            </div>
                                            <div className="order-item-info">
                                               <div className="order-item-info-name">{item.product.nameProduct}</div>
                                               <div className="order-item-info-quantity">
                                                  x<span>{item.quantityDetailsOrder}</span>
                                               </div>
                                            </div>
                                            <div className="order-item-price">
                                               {item.priceDetailsOrder.toLocaleString()}đ
                                            </div>
                                         </div>
                                      ))}
                                      <div className="order-item-control">
                                         <div className="order-item-total-price">
                                            Tổng giá trị đơn hàng:{' '}
                                            <strong>{order.totalPrice.toLocaleString()} đ</strong>
                                         </div>
                                         <div>
                                            <Link
                                               to={`/order/customer/${idCustomer}/details/${order.id}`}
                                               className="btn btn-info btn-details"
                                            >
                                               Xem chi tiết
                                            </Link>
                                            {existsReview.includes(order.id) ? (
                                               <button type="button" className="btn btn-success" disabled>
                                                  Đã đánh giá
                                               </button>
                                            ) : (
                                               <button
                                                  onClick={() => this.handleClickReview(order)}
                                                  type="button"
                                                  className="btn btn-primary"
                                               >
                                                  Đánh giá
                                               </button>
                                            )}
                                         </div>
                                      </div>
                                   </div>
                                ))
                              : orderList.map((order, index) => (
                                   <div key={index} className="order-list">
                                      <div className="order-item-top">
                                         <div className="order-item-top-id">ID đơn hàng: {order.id}</div>
                                         <div className="order-item-top-status">
                                            {this.tranferStatuENGToVN(order.orderStatus)}
                                         </div>
                                      </div>
                                      {order.detailsOrders.map((item, index2) => (
                                         <div key={index2} className="order-item">
                                            <div className="order-item-img">
                                               <div
                                                  className="order-item-img-data"
                                                  style={{
                                                     backgroundImage: `url(data:image/jpeg;base64,${item.product.images[0].imageData}`,
                                                  }}
                                               ></div>
                                            </div>
                                            <div className="order-item-info">
                                               <div className="order-item-info-name">{item.product.nameProduct}</div>
                                               <div className="order-item-info-quantity">
                                                  x<span>{item.quantityDetailsOrder}</span>
                                               </div>
                                            </div>
                                            <div className="order-item-price">
                                               {item.priceDetailsOrder.toLocaleString()}đ
                                            </div>
                                         </div>
                                      ))}
                                      <div className="order-item-control">
                                         <div className="order-item-total-price">
                                            Tổng giá trị đơn hàng:{' '}
                                            <strong>{order.totalPrice.toLocaleString()} đ</strong>
                                         </div>
                                         <div style={{ display: 'flex' }}>
                                            <Link
                                               to={`/order/customer/${idCustomer}/details/${order.id}`}
                                               className="btn btn-info btn-details"
                                            >
                                               Xem chi tiết
                                            </Link>
                                            {existsReview.includes(order.id) ? (
                                               <button type="button" className="btn btn-success" disabled>
                                                  Đã đánh giá
                                               </button>
                                            ) : (
                                               <button
                                                  onClick={() => this.handleClickReview(order)}
                                                  type="button"
                                                  className="btn btn-primary"
                                               >
                                                  Đánh giá
                                               </button>
                                            )}
                                         </div>
                                      </div>
                                   </div>
                                ))}
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <Footer />
         </div>
      );
   }
}

export default Order;
