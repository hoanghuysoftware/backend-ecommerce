import React, { Component } from 'react';
import './Home.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Slide from '../../components/Slide/Slide';
import ListProduct from '../../components/ListProducts/ListProduct';
import BackToTop from '../../components/BackToTop/BackToTop';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import ApiBrandService from '../../service/brandService';
import { connect } from 'react-redux';
import Loader from '../../components/Loader/Loader';

class Home extends Component {
   constructor(props) {
      super(props);
      this.state = {
         listBrand: [],
      };
   }

   async componentDidMount() {
      // localStorage.getItem('idUser') !== null ? localStorage.getItem('idUser') : localStorage.setItem('idUser', 3);
      try {
         const data = await ApiBrandService.getAllBrand();
         this.setState({ listBrand: data });
      } catch (error) {
         console.log(`Loi khi lay brand tai homepage: ${error}`);
      }
   }
   filterProductByNameBrand(nameBrand) {
      const allProduct = this.props.products;
      const dataInit = [];
      allProduct.forEach((product) => {
         if (product.brand.nameBrand === nameBrand.toUpperCase() && product.images.length > 0) {
            dataInit.push(product);
         }
      });
      return dataInit;
   }
   productHaveSales() {
      const allProduct = this.props.products;
      const dataInit = [];

      allProduct.forEach((product) => {
         if (product.sale !== null && product.images.length > 0) {
            dataInit.push(product);
         }
      });
      return dataInit;
   }

   render() {
      window.onscroll = this.scrollFunction;
      const { listBrand } = this.state;
      const { products } = this.props;
      if (products.length === 0) return <Loader />;
      return (
         <div>
            <Header />
            <div className="home-content">
               <div className="home-slides">
                  <Slide data={null} />
                  <br />
                  <div className="child-wapper">
                     <div className="product-sale">
                        <div className="product-sale-top" style={{ display: 'flex' }}>
                           <div className="product-sale-title" style={{ display: 'flex' }}>
                              <div className="product-sale-icon">
                                 <i className="fa-solid fa-bolt"></i>
                              </div>
                              <div className="product-sale-contetn">FLASH SALE</div>
                           </div>
                           <Link to="/products/khuyen-mai" className="product-sale-link">
                              Xem tất cả
                           </Link>
                        </div>
                        <div className="product-sale-main">
                           <ListProduct numbershow={5} data={this.productHaveSales()} />
                        </div>
                     </div>
                     {listBrand.map((item, index) => (
                        <div key={index} className="product-brand">
                           <div className="product-brand-top">
                              <div className="product-brand-title">{item.nameBrand}</div>
                              <Link to={`/products/${item.nameBrand}`} className="product-brand-link">
                                 Xem tất cả <i className="fa-solid fa-caret-down"></i>
                              </Link>
                           </div>
                           <div className="product-brand-main">
                              <ListProduct numbershow={5} data={this.filterProductByNameBrand(item.nameBrand)} />
                           </div>
                        </div>
                     ))}
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
   products: state.products,
   quantity_cards: state.quantity_cards,
});

export default connect(mapStateToProps)(Home);
