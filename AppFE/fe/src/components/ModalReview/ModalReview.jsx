import React, { Component } from 'react';
import './modaReview.css';
import ApiReviewService from '../../service/reviewService';

class ModalReview extends Component {
   constructor(props) {
      super(props);
      this.state = {
         data: this.props.data,
         reviews: [],
      };
   }
   reloadWindowPage = () => {
      window.location.reload();
   };
   handleChangeText = (index, event) => {
      const { value } = event.target;
      const { reviews, data } = this.state;
      const reviewObj = {
         contentReview: value,
         idProduct: index,
         idOrder: data.id,
      };
      const updatedReviews = [...reviews];
      updatedReviews[index] = reviewObj;
      this.setState({ reviews: updatedReviews });
   };
   handleSubmit = async () => {
      const { reviews } = this.state;
      const postData = reviews.filter((review) => review !== undefined);
      console.log(postData);
      try {
         postData.forEach(async (review) => {
            await ApiReviewService.createNewReview(review);
         });
         this.reloadWindowPage();
      } catch (error) {
         console.log(`Loi khi tao danh gia cho don hang tai ModalReview: ${error}`);
      }
   };
   render() {
      const { data } = this.state;
      return (
         <div className="review-input-container">
            <h2 className="review-input-title">Đánh giá sản phẩm có trong đơn hàng</h2>
            <div className="review-input-list">
               {data !== undefined &&
                  data.detailsOrders.map((item, index6) => (
                     <div key={index6} className="review-input-item">
                        <div className="review-item-img">
                           <div
                              className="review-item-img-data"
                              style={{
                                 backgroundImage: `url(data:image/jpeg;base64,${item.product.images[0].imageData}`,
                              }}
                           ></div>
                        </div>
                        <div className="review-item-content">
                           <div className="review-item-content-name">{item.product.nameProduct}</div>
                           <div className="review-item-content-input">
                              <textarea
                                 onChange={(e) => this.handleChangeText(item.product.id, e)}
                                 name="content"
                                 cols="30"
                                 rows="3"
                              ></textarea>
                           </div>
                        </div>
                     </div>
                  ))}
            </div>
            <button onClick={() => this.reloadWindowPage()} type="button" className="btn btn-secondary">
               Trở về
            </button>
            <button onClick={() => this.handleSubmit()} type="button" className="btn btn-primary">
               Lưu đánh giá
            </button>
         </div>
      );
   }
}

export default ModalReview;
