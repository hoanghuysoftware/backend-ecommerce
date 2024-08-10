import React, { Component } from 'react';
import './BackToTop.css';

class BackToTop extends Component {
   constructor(props) {
      super(props);
      this.state = {};
   }
   scrollToTop() {
      window.scrollTo({
         top: 0,
         behavior: 'smooth', // Cuộn mượt
      });
   }

   scrollFunction() {
      const backToTopBtn = document.getElementById('back-to-top-btn');
      if (backToTopBtn) {
         if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            backToTopBtn.style.display = 'block';
         } else {
            backToTopBtn.style.display = 'none';
         }
      }
   }
   render() {
    window.onscroll = this.scrollFunction;
      return (
         <button onClick={this.scrollToTop} id="back-to-top-btn" title="Back to Top">
            <i className="fa-solid fa-angles-up"></i>
         </button>
      );
   }
}

export default BackToTop;
