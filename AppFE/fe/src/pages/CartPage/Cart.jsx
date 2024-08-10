import React, { Component } from 'react';
import './Cart.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import ApiCustormerService from '../../service/userService';
import ApiCartService from '../../service/cartService';
import { connect } from 'react-redux';
import { setNumberInCart, removeNumberInCart, addNumberInCart } from '../../redux/action';
import EmptyCart from '../../components/EmptyCart/EmptyCart';

class Cart extends Component {
   constructor(props) {
      super(props);
      this.state = {
         idUser: localStorage.getItem('idUser'), // id user for testing purposes at button "Xem gio hang"
         cart: '',
         detailsCart: [],
         quantity: 0,
      };
   }
   handleIncrement = async (index) => {
      this.setState((prevState) => {
         const updatedDetailsCart = [...prevState.detailsCart];
         updatedDetailsCart[index].quantityDetailCart += 1;
         return {
            detailsCart: updatedDetailsCart,
         };
      });
      const { idUser, detailsCart } = this.state;
      const idProduct = detailsCart[index].product.id;
      const quantity = this.state.detailsCart[index].quantityDetailCart + 1;
      const data = await ApiCartService.updateQuantityOfProduct(idUser, idProduct, quantity);
      this.setState({
         cart: data,
         detailsCart: data.detailsCarts,
      });
      this.props.addNumberInCart(1);
   };

   handleDecrement = async (index) => {
      this.setState((prevState) => {
         const updatedDetailsCart = [...prevState.detailsCart];
         if (updatedDetailsCart[index].quantityDetailCart > 0) {
            updatedDetailsCart[index].quantityDetailCart -= 1;
         }
         return {
            detailsCart: updatedDetailsCart,
         };
      });
      const { idUser, detailsCart } = this.state;
      const idProduct = detailsCart[index].product.id;
      const quantity = this.state.detailsCart[index].quantityDetailCart - 1;
      const data = await ApiCartService.updateQuantityOfProduct(idUser, idProduct, quantity);
      this.setState({
         cart: data,
         detailsCart: data.detailsCarts,
         // user: '',
      });
      this.props.removeNumberInCart(1);
   };

   async componentDidMount() {
      const idUser = parseInt(this.state.idUser);
      try {
         const data = await ApiCustormerService.getCustomersById(idUser);
         this.setState({
            // user: data,
            cart: data.cart,
            detailsCart: data.cart.detailsCarts,
         });
      } catch (error) {
         console.log(`loi khi lay user qua id tai Cart: ${error}`);
      }
   }

   handleRemoveProductInCart = async (index) => {
      const { idUser, detailsCart } = this.state;
      const idProduct = detailsCart[index].product.id;
      // console.log(detailsCart[index].quantityDetailCart);
      try {
         const data = await ApiCartService.removeProductFromCart(idUser, idProduct);
         this.setState({
            cart: data,
            detailsCart: data.detailsCarts,
         });
         this.props.removeNumberInCart(detailsCart[index].quantityDetailCart);
      } catch (error) {
         console.log('Loi khi xoa san pham trong gio hang tai Cart: ' + error.message());
      }
   };
   render() {
      // const { idUser } = this.state;
      const { cart, detailsCart } = this.state;
      return (
         <div>
            <Header />
            <div className="cart-main">
               <div className="child-wapper">
                  <div className="cart-title">
                     <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                           <li className="breadcrumb-item">
                              <Link to="/">Trang chủ</Link>
                           </li>
                           <li className="breadcrumb-item active" aria-current="page">
                              Giỏ hàng
                           </li>
                        </ol>
                     </nav>
                  </div>
                  <div className="cart-body">
                     <div className="cart-body-left">
                        {detailsCart.length === 0 ? (
                           <EmptyCart />
                        ) : (
                           <table className="table table-hover">
                              <thead>
                                 <tr className="table-info">
                                    <th scope="col"></th>
                                    <th scope="col" colSpan={2}>
                                       Sản phẩm
                                    </th>
                                    <th scope="col">Số lượng</th>
                                    <th scope="col">Tổng giá</th>
                                    <th scope="col"></th>
                                 </tr>
                              </thead>
                              <tbody>
                                 {detailsCart.map((item, index) => (
                                    <tr key={index}>
                                       <td className="tbl-img-item">
                                          <div
                                             className="tbl-img-item-data"
                                             style={{
                                                backgroundImage: `url(data:image/jpeg;base64,${item.product.images[0].imageData})`,
                                             }}
                                          ></div>
                                       </td>
                                       <td colSpan={2}>
                                          <p className="tbl-name-item">{item.product.nameProduct}</p>
                                          <p className="tbl-price-item">
                                             <span>Giá: </span>
                                             {item.product.priceProduct.toLocaleString()}đ
                                          </p>
                                       </td>
                                       <td className="tbl-quantity-item">
                                          <div className="tbl-quantity-item-content">
                                             <div className="quantity-input-container">
                                                <button
                                                   className="quantity-button"
                                                   onClick={() => this.handleDecrement(index)}
                                                >
                                                   -
                                                </button>
                                                <input
                                                   className="tbl-input-quantity"
                                                   type="number"
                                                   value={item.quantityDetailCart}
                                                   readOnly
                                                />
                                                <button
                                                   className="quantity-button"
                                                   onClick={() => this.handleIncrement(index)}
                                                >
                                                   +
                                                </button>
                                             </div>
                                          </div>
                                       </td>
                                       <td className="tbl-total-price">
                                          {(item.product.priceProduct * item.quantityDetailCart).toLocaleString()}đ
                                       </td>
                                       <td className="tbl-trash-item">
                                          <i
                                             onClick={() => this.handleRemoveProductInCart(index)}
                                             className="fa-solid fa-trash"
                                          ></i>
                                       </td>
                                    </tr>
                                 ))}
                              </tbody>
                           </table>
                        )}

                        <div className="btn-cart-group">
                           <Link to="/" type="button" className="btn btn-secondary">
                              <i className="fa-solid fa-arrow-left-long" style={{ marginRight: '10px' }}></i>
                              Tiếp tục mua sắm
                           </Link>
                        </div>
                     </div>
                     <div className="cart-body-right">
                        <table className="table table-brief-cart">
                           <tbody>
                              <tr>
                                 <td>Số lượng:</td>
                                 <td style={{ fontWeight: '700' }}>{cart.quantityCart}</td>
                              </tr>
                              <tr>
                                 <td>Tổng giá:</td>
                                 <td style={{ fontWeight: '800', color: 'red' }}>
                                    {cart && typeof cart.priceCart !== 'undefined'
                                       ? cart.priceCart.toLocaleString() + 'đ'
                                       : 'N/A'}
                                 </td>
                              </tr>
                           </tbody>
                        </table>
                        {detailsCart.length > 0 ? (
                           <Link to="/check-out" type="button" className="btn btn-primary btn-pay-link">
                              Tiến hành thanh toán
                           </Link>
                        ) : (
                           <Link to="/check-out" type="button" className="btn btn-secondary btn-pay-link disabled">
                              Tiến hành thanh toán
                           </Link>
                        )}
                     </div>
                  </div>
               </div>
            </div>
            <Footer />
         </div>
      );
   }
}

const mapStateToProps = (state) => ({
   quantity_cards: state.quantity_cards,
});
const mapDispatchToProps = {
   setNumberInCart,
   addNumberInCart,
   removeNumberInCart,
};
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
