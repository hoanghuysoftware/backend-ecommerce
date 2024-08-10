import React, { Component } from 'react';
import './index.css';

class EmptyCart extends Component {
   render() {
      return (
         <div className="empty-cart">
            <div className="empty-cart-content">
               <div className="empty-cart-img">
                  <img src="/img/cart-empty.webp" alt="" />
               </div>
            </div>
         </div>
      );
   }
}

export default EmptyCart;
