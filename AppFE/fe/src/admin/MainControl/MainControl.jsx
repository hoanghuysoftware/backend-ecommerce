import React, { Component } from 'react';
import './.main-control.css';
import ProductPage from '../ProductPage/ProductPage';
import OrderPage from '../OrderPage/OrderPage';
import HomePage from '../HomePage/HomePage';
import ImportPage from '../ImportPage/ImportPage';
import SalePage from '../SalePage/SalePage';
import BrandPage from '../BrandPage/BrandPage';
import { withRouter } from 'react-router-dom';

class MainControl extends Component {
   constructor(props) {
      super(props);
      this.state = {};
   }

   handleLogout = () => {
      this.props.history.push('/login');
   };

   render() {
      const imgURL = '/img/logo-favicon.png';
      return (
         <div className="main-control">
            <div className="main-control-left">
               <div className="main-control-logo">
                  <img src={imgURL} alt="logo-page" />
               </div>
               <div className="main-control-nav">
                  <div className="list-group" id="list-tab" role="tablist">
                     <a
                        className="list-group-item list-group-item-action active"
                        id="list-home-list"
                        data-toggle="list"
                        href="#list-home"
                        role="tab"
                        aria-controls="home"
                     >
                        Trang chủ
                     </a>
                     <a
                        className="list-group-item list-group-item-action"
                        id="list-product-list"
                        data-toggle="list"
                        href="#list-product"
                        role="tab"
                        aria-controls="product"
                     >
                        Sản phẩm
                     </a>
                     <a
                        className="list-group-item list-group-item-action"
                        id="list-brand-list"
                        data-toggle="list"
                        href="#list-brand"
                        role="tab"
                        aria-controls="brand"
                     >
                        Thương hiệu
                     </a>
                     <a
                        className="list-group-item list-group-item-action"
                        id="list-sale-list"
                        data-toggle="list"
                        href="#list-sale"
                        role="tab"
                        aria-controls="sale"
                     >
                        Khuyến mãi
                     </a>
                     <a
                        className="list-group-item list-group-item-action"
                        id="list-import-list"
                        data-toggle="list"
                        href="#list-import"
                        role="tab"
                        aria-controls="import"
                     >
                        Nhập hàng
                     </a>
                     <a
                        className="list-group-item list-group-item-action"
                        id="list-order-list"
                        data-toggle="list"
                        href="#list-order"
                        role="tab"
                        aria-controls="order"
                     >
                        Đơn hàng
                     </a>
                  </div>
               </div>
               <div className="main-control-user">
                  <div className="main-control-user-name">
                     <p>Nguyễn Hoàng Huy</p>
                  </div>
                  <div className="main-control-user-logout" onClick={this.handleLogout}>
                     <i className="fa-solid fa-arrow-right-from-bracket"></i>
                  </div>
               </div>
            </div>
            {/* Cho quyet dinh render ra cai component nao */}
            <div className="main-control-right">
               <div className="tab-content" id="nav-tabContent">
                  <div
                     className="tab-pane fade show active"
                     id="list-home"
                     role="tabpanel"
                     aria-labelledby="list-home-list"
                  >
                     <HomePage />
                  </div>
                  <div className="tab-pane fade" id="list-product" role="tabpanel" aria-labelledby="list-product-list">
                     <ProductPage />
                  </div>
                  <div className="tab-pane fade" id="list-sale" role="tabpanel" aria-labelledby="list-sale-list">
                     <SalePage />
                  </div>
                  <div className="tab-pane fade" id="list-import" role="tabpanel" aria-labelledby="list-import-list">
                     <ImportPage />
                  </div>
                  <div className="tab-pane fade" id="list-order" role="tabpanel" aria-labelledby="list-order-list">
                     <OrderPage />
                  </div>
                  <div className="tab-pane fade" id="list-brand" role="tabpanel" aria-labelledby="list-brand-list">
                     <BrandPage />
                  </div>
               </div>
            </div>
         </div>
      );
   }
}

export default withRouter(MainControl);
