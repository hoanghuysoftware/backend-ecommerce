import React, { Component } from 'react';
import './Review.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import BackToTop from '../../components/BackToTop/BackToTop';
import ApiReviewService from '../../service/reviewService';
import { connect } from 'react-redux';

class Review extends Component {
   constructor(props) {
      super(props);
      this.state = {
         idProduct: this.props.match.params.id,
         dataImg: '/lenovo1.jpg',
         product: '',
         reviewList: [],
      };
   }

   returnBack = () => {
      window.history.back();
   };

   async componentDidMount() {
      const { idProduct } = this.state;
      try {
         const data = await ApiReviewService.getAllReview(idProduct);
         this.setState({ reviewList: data });
      } catch (error) {
         console.log(`Loi khi lay all danh gia tai ReviewPage: ${error.message}`);
      }
      const allProduct = this.props.products;
      for (const product of allProduct) {
         if (product.id === parseInt(idProduct)) {
            this.setState({ product: product });
            break;
         } else {
            this.setState({ dataImg: '/lenovo1.jpg' });
         }
      }
   }

   render() {
      const { reviewList, product } = this.state;
      let nameProduct = '';
      let img = '';
      if (product) {
         nameProduct = product.nameProduct;
         img = `data:image/jpeg;base64,${product.images[0].imageData}`;
      }
      return (
         <div>
            <Header />
            <div className="review-main">
               <div className="child-wapper">
                  <div className="review-body">
                     <button onClick={this.returnBack} type="button" className="btn btn-outline-secondary btn-return">
                        Trở về
                     </button>
                     <h3 className="review-body-title">{nameProduct}</h3>
                     <div className="review-body-img">
                        <div
                           className="review-body-img-content"
                           style={{
                              backgroundImage: `url(${img})`,
                           }}
                        ></div>
                     </div>
                     <div className="review-body-main">
                        <div className="review-body-list">
                           {reviewList.length > 0 ? (
                              reviewList.map((item, indexed) => (
                                 <div key={indexed} className="review-body-item">
                                    <h5 className="product-review-content-name">
                                       {item.nameCustomer} <span>{item.dateReview}</span>
                                    </h5>
                                    <p className="product-review-content-body">{item.contentReview}</p>
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
                     </div>
                  </div>
               </div>
               <BackToTop />
               <Footer />
            </div>
         </div>
      );
   }
}

const mapStateToProps = (state) => ({
   products: state.products,
});

export default connect(mapStateToProps)(Review);
