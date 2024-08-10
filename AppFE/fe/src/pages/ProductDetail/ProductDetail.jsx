import React, { Component } from 'react';
import './ProductDetail.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import Slide from '../../components/Slide/Slide';
import BackToTop from '../../components/BackToTop/BackToTop';
import ApiProductService from '../../service/productService';
import Loader from '../../components/Loader/Loader';
import ApiCartService from '../../service/cartService';
import { connect } from 'react-redux';
import { addNumberInCart } from '../../redux/action';
import ApiReviewService from '../../service/reviewService';

class ProductDetail extends Component {
   constructor(props) {
      super(props);
      this.state = {
         idUser: localStorage.getItem('idUser'),
         showDetails: false,
         quantity: 1,
         idProduct: this.props.match.params.id,
         product: '',
         imgList: [],
         review: [],
      };
      this.toggleDetails = this.toggleDetails.bind(this);
      this.handleAddProductToCart = this.handleAddProductToCart.bind(this);
   }
   toggleDetails() {
      this.setState((prevState) => ({
         showDetails: !prevState.showDetails,
      }));
   }

   decreaseQuantity = () => {
      if (this.state.quantity > 0) {
         this.setState({ quantity: this.state.quantity - 1 });
      }
   };

   increaseQuantity = () => {
      this.setState({ quantity: this.state.quantity + 1 });
   };
   async componentDidMount() {
      const id = parseInt(this.state.idProduct);
      try {
         const data = await ApiProductService.getProductById(id);
         this.setState({ product: data });
         const imgs = [];
         await data.images.map((item) => imgs.push(item.imageData));
         this.setState({ imgList: imgs });
      } catch (error) {
         console.log(`loi khi get product by id tai productDetais: ${error}`);
      }

      try {
         const data = await ApiReviewService.getAllReview(id);
         this.setState({ review: data });
      } catch (error) {
         console.log(`Loi khi lay all danh gia tai ProductDetails: ${error.message}`);
      }
   }
   async handleAddProductToCart() {
      const idUser = this.state.idUser;
      const idProduct = this.state.idProduct;
      const quantity = this.state.quantity;
      const postData = {
         quantity: quantity,
         idProduct: idProduct,
      };
      // console.log(postData);
      try {
         await ApiCartService.addProductToCart(idUser, postData);
         this.props.addNumberInCart(quantity);
         this.props.history.push(`/cart/${idUser}`);
      } catch (error) {
         console.log(`loi khi add product to cart: ${error}`);
      }
   }

   render() {
      const { quantity, showDetails, product, imgList, review } = this.state;
      if (product === null) {
         return <Loader />;
      }
      return (
         <div style={{ backgroundColor: 'var(--backroundColor-White)' }}>
            <Header />
            <div className="nav-link-mini">
               <nav aria-label="breadcrumb">
                  <ol
                     className="breadcrumb"
                     style={{
                        marginBottom: '0',
                        backgroundColor: 'var(--backroundColor-White)',
                     }}
                  >
                     <li className="breadcrumb-item">
                        <Link to="/">Home</Link>
                     </li>
                     <li className="breadcrumb-item">
                        <Link to="/">{product.brand !== undefined ? product.brand.nameBrand : ''}</Link>
                     </li>
                     <li className="breadcrumb-item active" aria-current="page">
                        {product.nameProduct}
                     </li>
                  </ol>
               </nav>
            </div>
            <div className="child-wapper">
               <div className="product-content">
                  <h1 className="product-name">{product.nameProduct}</h1>
                  <div className="product-info" style={{ display: 'flex' }}>
                     <div className="product-info-img">{imgList.length !== 0 ? <Slide data={imgList} /> : ''}</div>
                     <div className="product-info-quantity">
                        <div className="product-info-price">
                           {product && product.priceProduct ? product.priceProduct.toLocaleString() : ''} đ
                        </div>
                        <div className="product-info-price-content" style={{ display: 'flex' }}>
                           <del className="product-info-price-old">20.000.000 đ</del>
                           <p className="product-info-price-sale">-50%</p>
                        </div>
                        <div className="product-select-quantity" style={{ display: 'flex' }}>
                           <h4 className="select-product-title">Số lượng:</h4>
                           <button className="quantity-control-btn quantity-decrease" onClick={this.decreaseQuantity}>
                              -
                           </button>
                           <input type="number" className="product-quantity-input" value={quantity} readOnly />
                           <button className="quantity-control-btn quantity-increase" onClick={this.increaseQuantity}>
                              +
                           </button>
                           <span className="product-quantity-real">{product.quantityProduct}</span>
                        </div>
                        <div className="product-info-btn">
                           <button
                              onClick={this.handleAddProductToCart}
                              type="button"
                              className="btn btn-primary product-btn-addtocart"
                           >
                              Thêm vào giỏ hàng
                           </button>
                           <button type="button" className="btn btn-primary product-btn-pay">
                              Mua ngay
                           </button>
                        </div>
                     </div>
                     <div className="product-info-maintain">
                        <div className="product-maintain-info">
                           <h3 className="product-maintain-info-title1">Thông tin bảo hành</h3>
                           <div className="product-maintain-info-connent1">
                              <p>✅Bảo hành chính hãng Lenovo Việt Nam 12 tháng - Xem chính sách</p>
                              <p>✅Giá ở trên đã bao gồm 10% VAT</p>
                              <p>✅ MIỄN PHÍ GIAO HÀNG TẬN NHÀ</p>
                              <p>
                                 - Với đơn hàng ít hơn 4.000.000 đồng: Miễn phí giao hàng cho đơn hàng ít hơn 5km tính
                                 từ cửa hàng gần nhất
                              </p>
                              <p></p>
                           </div>
                        </div>
                        <div className="product-info-yentammuahang">
                           <h3 className="product-maintain-info-title2">Yên tâm bảo hành</h3>
                           <div className="product-maintain-info-connent2">
                              <p>Hệ thống cửa hàng toàn quốc</p>
                              <p>Đại lý phân phối chính hãng</p>
                              <p>Giá luôn tốt nhất</p>
                              <p>Hỗ trợ trả góp lãi suất thấp</p>
                              <p>Bảo hành dài, hậu mãi chu đáo</p>
                              <p>Miễn phí giao hàng toàn quốc</p>
                           </div>
                        </div>
                        <img src="/img/banner-right-detail.png" alt="" />
                     </div>
                  </div>
                  <div className="product-desc">
                     <div className="product-desc-info">
                        <h3 className="product-desc-title">
                           <span>Đặc điểm nổi bật</span>
                        </h3>
                        <div className={`product-desc-content ${showDetails ? 'show' : 'hide'}`}>
                           <p>{product.descProduct}</p>
                           <p>{product.descProduct}</p>
                        </div>
                        <button
                           type="button"
                           className="btn btn-outline-primary btn-show-details"
                           onClick={this.toggleDetails}
                        >
                           {showDetails ? 'Ẩn chi tiết' : 'Xem chi tiết'}
                        </button>
                     </div>
                     <div className="product-desc-config">
                        <h3 className="product-desc-title">
                           <span>Thông số kỹ thuật</span>
                        </h3>
                        <div className="product-config-content">
                           <table>
                              <tbody>
                                 <tr>
                                    <td>CPU</td>
                                    <td> Core i7 9750H 4 nhân 8 luồng 2.60Ghz Up to 4.1Ghz-8Mb</td>
                                 </tr>
                                 <tr>
                                    <td>Card đồ họa</td>
                                    <td>NVIDIA GTX1050 3GB DDR5</td>
                                 </tr>
                                 <tr>
                                    <td>Bộ nhớ</td>
                                    <td>1* 8Gb bus 2400 MHz</td>
                                 </tr>
                                 <tr>
                                    <td>Ổ cứng</td>
                                    <td>SSD NVMe 512GB, hỗ trợ khe cắm HDD sata</td>
                                 </tr>
                                 <tr>
                                    <td>Màn hình</td>
                                    <td>15.6 Inch Full HD</td>
                                 </tr>
                                 <tr>
                                    <td>Kết nối</td>
                                    <td>LAN, Wifi, Bluetooth</td>
                                 </tr>
                                 <tr>
                                    <td>Cổng giao tiếp</td>
                                    <td>2 x USB 3.0 1 x USB 2.0 1 x HDMI Card Reader</td>
                                 </tr>
                                 <tr>
                                    <td>Webcam</td>
                                    <td>Có</td>
                                 </tr>
                                 <tr>
                                    <td>Nhận dạng vân tay</td>
                                    <td>Không có</td>
                                 </tr>
                                 <tr>
                                    <td>Tính năng khác</td>
                                    <td>Màn hình Full HD Mỏng, nhẹ</td>
                                 </tr>
                                 <tr>
                                    <td>Hệ điều hành</td>
                                    <td>Win10</td>
                                 </tr>
                                 <tr>
                                    <td>Pin</td>
                                    <td>3 cell</td>
                                 </tr>
                                 <tr>
                                    <td>Trọng lượng</td>
                                    <td>2 kg</td>
                                 </tr>
                              </tbody>
                           </table>
                        </div>
                     </div>
                  </div>
                  {/* Review comment */}
                  <div className="product-review">
                     <div className="product-review-content">
                        <h3 className="product-review-title">
                           <strong>Đánh giá cho </strong>
                           [New 100%] Laptop Lenovo LOQ 15IAX9 83GS000FVN - Intel Core i5-12450HX | RTX 2050 4GB | 15.6
                           inch Full HD 144Hz 100% sRGB
                        </h3>
                        <div className="product-review-content-list">
                           {review.length > 0 ? (
                              review.slice(Math.max(review.length - 3, 0)).map((rv, index) => (
                                 <div key={index} className="product-review-content-item">
                                    <h5 className="product-review-content-name">
                                       {rv.nameCustomer} <span>{rv.dateReview}</span>
                                    </h5>
                                    <p className="product-review-content-body">{rv.contentReview}</p>
                                 </div>
                              ))
                           ) : (
                              <div className="review-body-item">
                                 <h5 className="product-review-content-name"> </h5>
                                 <p
                                    className="product-review-content-body"
                                    style={{
                                       textAlign: 'center',
                                       fontWeight: '800',
                                       fontSize: '20px',
                                       color: 'red',
                                       textTransform: 'uppercase',
                                    }}
                                 >
                                    Chưa có đánh giá nào về sản phẩm này !
                                 </p>
                              </div>
                           )}
                        </div>

                        <Link to={`/review/${product.id}`} className="btn btn-primary">
                           Xem tất cả đánh giá
                        </Link>
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
const mapStateToProps = (state) => ({
   quantity_cards: state.quantity_cards,
});

const mapDispatchToProps = {
   addNumberInCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
