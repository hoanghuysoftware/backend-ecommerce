import React, { Component } from 'react';
import './Header.css';
import '../../css/main.css';
import { Link } from 'react-router-dom/cjs/react-router-dom';
// import { Link } from "react-router-dom";
// import ApiCartService from '../../service/cartService';
import ApiCustormerService from '../../service/userService';
import { connect } from 'react-redux';
import { setNumberInCart } from '../../redux/action';
import EmptyCart from '../EmptyCart/EmptyCart';

class Header extends Component {
   constructor(props) {
      super(props);
      this.state = {
         showAccountTab: false,
         showCartTab: false,
         detailsCart: [],
         idUser: localStorage.getItem('idUser'),
         user: '',
      };
   }

   handleMouseEnter = (tabId) => {
      this.setState({
         [tabId]: true,
      });
   };

   handleMouseLeave = (tabId) => {
      this.setState({
         [tabId]: false,
      });
   };
   async componentDidMount() {
      try {
         const data = await ApiCustormerService.getCustomersById(this.state.idUser);
         this.setState({ detailsCart: data.cart.detailsCarts, user: data });
         setNumberInCart(data.cart.quantityCart);
      } catch (error) {
         console.log('Error while get user profile: ', error);
      }
   }

   render() {
      const { showAccountTab, showCartTab, detailsCart, idUser } = this.state;
      const numberInCart = this.props.quantity_cards;
      return (
         <header>
            <div className="main-wapper">
               <div className="header-top">
                  <div className="heder-top-left"></div>
                  <div className="heder-top-center">
                     <div
                        id="carouselExampleControls"
                        className="carousel slide header-slide"
                        data-ride="carousel"
                        style={{ height: '100%' }}
                     >
                        <div className="carousel-inner" style={{ height: '100%' }}>
                           <div className="carousel-item header-slide-item active">
                              <p className="header-slide-data">
                                 Today's Black Friday deals
                                 <span style={{ color: 'red', fontWeight: '700' }}> 40% off</span>
                              </p>
                           </div>
                           <div className="carousel-item header-slide-item">
                              <p className="header-slide-data">
                                 🔥 <span style={{ color: 'red', fontWeight: '700' }}>25% OFF</span> ON YOUR 2 ORDER
                              </p>
                           </div>
                        </div>
                        <button
                           className="carousel-control-prev"
                           type="button"
                           data-target="#carouselExampleControls"
                           data-slide="prev"
                        >
                           <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                           <span className="sr-only">Previous</span>
                        </button>
                        <button
                           className="carousel-control-next"
                           type="button"
                           data-target="#carouselExampleControls"
                           data-slide="next"
                        >
                           <span className="carousel-control-next-icon" aria-hidden="true"></span>
                           <span className="sr-only">Next</span>
                        </button>
                     </div>
                  </div>
                  <div className="heder-top-right">
                     <div className="header-top-contact">
                        <div className="header-top-contact__icon">
                           <i className="fa-solid fa-headphones-simple"></i>
                        </div>
                        <div className="header-top-contact__content">
                           <p>035.286.3062</p>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="header-body">
                  <div className="child-wapper header-body-main">
                     <div className="header-body-left">
                        <div className="header-icon-shop">
                           <img src="/img/logo-favicon.png" alt="shop" style={{ filter: 'invert(1)' }} />
                        </div>
                     </div>
                     <div className="header-body-center">
                        <div className="header-body-search">
                           <div className="header-search-icon">
                              <i className="fa-solid fa-magnifying-glass"></i>
                           </div>
                           <div className="header-search-input">
                              <form action="/search" method="get">
                                 <input type="text" name="name-product" placeholder="What are you looking for..." />
                              </form>
                           </div>
                        </div>
                     </div>
                     <div className="header-body-right">
                        <div className="header-body-right-infor">
                           <div
                              className="header-body-infor-account"
                              onMouseEnter={() => this.handleMouseEnter('showAccountTab')}
                              onMouseLeave={() => this.handleMouseLeave('showAccountTab')}
                           >
                              <i className="fa-regular fa-user"></i>
                              <div
                                 className="tab account-tab"
                                 id="account-tab"
                                 style={{ display: showAccountTab ? 'block' : 'none' }}
                              >
                                 <div className="account-tab-link">
                                    <Link to={`/account-info/${idUser}`}>
                                       <p>Tài khoản của tôi</p>
                                    </Link>
                                 </div>
                                 <div className="account-tab-link">
                                    <Link to={`/orders/${idUser}`}>
                                       <p>Đơn mua</p>
                                    </Link>
                                 </div>
                                 <div className="account-tab-link">
                                    <Link to="/login">
                                       <p>Đăng xuất</p>
                                    </Link>
                                 </div>
                              </div>
                           </div>
                           <div
                              className="header-body-infor-cart "
                              onMouseEnter={() => this.handleMouseEnter('showCartTab')}
                              onMouseLeave={() => this.handleMouseLeave('showCartTab')}
                           >
                              <span className="cart-number-mini">{numberInCart}</span>
                              <i className="fa-solid fa-cart-shopping"></i>
                              <div
                                 className="tab cart-tab"
                                 id="cart-tab"
                                 style={{ display: showCartTab ? 'block' : 'none' }}
                              >
                                 <div className="cart-tab-top">
                                    <p className="cart-tab-top-title">Sản phẩm mới thêm</p>
                                 </div>
                                 {detailsCart.length === 0 ? (
                                    <EmptyCart />
                                 ) : (
                                    <div className="cart-tab-main">
                                       {detailsCart.map((item, index) => (
                                          <Link
                                             key={index}
                                             to={`/product/${item.product.id}`}
                                             className="cart-main-item"
                                          >
                                             <div className="cart-main-item-img">
                                                <div
                                                   className="cart-main-item-img-data"
                                                   style={{
                                                      backgroundImage: `url(data:image/jpeg;base64,${item.product.images[0].imageData})`,
                                                   }}
                                                ></div>
                                             </div>
                                             <div className="cart-main-item-content">
                                                <div className="cart-item-content-name">{item.product.nameProduct}</div>
                                                <div className="cart-item-content-quantity">
                                                   x{item.quantityDetailCart}
                                                </div>
                                             </div>
                                             <div className="cart-main-item-price">
                                                {item.priceDetailCart.toLocaleString()}đ
                                             </div>
                                          </Link>
                                       ))}
                                    </div>
                                 )}

                                 <div className="cart-tab-bottom">
                                    <Link to={`/cart/${idUser}`} type="button" className="btn btn-primary">
                                       Xem giỏ hàng
                                    </Link>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="header-bottom">
                  <div className="child-wapper">
                     <ul className="header-link__list">
                        <li className="header-link__item">
                           <h2 className="header-link__item-title">
                              <Link to="/">Home</Link>
                           </h2>
                        </li>
                        <li className="header-link__item">
                           <h2 className="header-link__item-title">
                              <Link to="/blog">Blob</Link>
                           </h2>
                        </li>
                        <li className="header-link__item">
                           <h2 className="header-link__item-title">
                              <Link to="/">Home</Link>
                           </h2>
                        </li>
                        <li className="header-link__item">
                           <h2 className="header-link__item-title">
                              <Link to="/">Home</Link>
                           </h2>
                        </li>
                        <li className="header-link__item">
                           <h2 className="header-link__item-title">
                              <Link to="/">Home</Link>
                           </h2>
                        </li>
                     </ul>
                  </div>
               </div>
            </div>
         </header>
      );
   }
}

const mapStateToProps = (state) => ({
   quantity_cards: state.quantity_cards,
});
const mapDispatchToProps = {
   setNumberInCart,
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
