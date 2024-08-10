import React, { Component } from 'react';
import './Products.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import BackToTop from '../../components/BackToTop/BackToTop';
import ListProduct from '../../components/ListProducts/ListProduct';
import { connect } from 'react-redux';
// import ApiProductService from '../../service/productService';
// import { Link } from 'react-router-dom/cjs/react-router-dom';

class Products extends Component {
   constructor(props) {
      super(props);
      this.state = {
         nameType: this.props.match.params.nameType,
         dataRender: [],
      };
   }

   filerProductByNameType() {
      const allProduct = this.props.products;
      const name = this.state.nameType;
      allProduct.forEach((product) => {
         if (product.brand.nameBrand === name.toUpperCase() && product.images.length > 0) {
            this.state.dataRender.push(product);
         }
      });
   }
   handleClickBrand = (e) => {
      const nameBrand = e;
      console.log(nameBrand);
      this.setState({ nameType: nameBrand });
   };

   render() {
      this.filerProductByNameType();
      const { dataRender } = this.state;
      return (
         <div>
            <Header />
            <div className="products-main">
               <div className="child-wapper">
                  <div className="products-body">
                     <div className="products-body-top">
                        <div className="products-top-link-brand">
                           <h3 className="products-top-link-title">Thương hiệu:</h3>
                           <div onClick={() => this.handleClickBrand(`Asus`)} className="products-link-brand-item">
                              <img src="/asus.png" alt="Asus brand" />
                           </div>
                           <div onClick={() => this.handleClickBrand(`dell`)} className="products-link-brand-item">
                              <img src="/dell.png" alt="dell brand" />
                           </div>
                           <div onClick={() => this.handleClickBrand(`acer`)} className="products-link-brand-item">
                              <img src="/acer.png" alt="acer brand" />
                           </div>
                           <div onClick={() => this.handleClickBrand(`hp`)} className="products-link-brand-item">
                              <img src="/hp.png" alt="hp brand" />
                           </div>
                           <div onClick={() => this.handleClickBrand(`msi`)} className="products-link-brand-item">
                              <img src="/msi.png" alt="msi brand" />
                           </div>
                           <div onClick={() => this.handleClickBrand(`lenovo`)} className="products-link-brand-item">
                              <img src="/lenovo.png" alt="lenovo brand" />
                           </div>
                        </div>
                        <div className="products-top-price">
                           <div className="products-top-link-title">Chọn khoản giá:</div>
                           <div className="products-top-price-item">
                              <button type="button" className="btn btn-primary btn-price-item">
                                 5 triệu - 10 triệu
                              </button>
                              <button type="button" className="btn btn-primary btn-price-item">
                                 10 triệu - 15 triệu
                              </button>
                              <button type="button" className="btn btn-primary btn-price-item">
                                 15 triệu - 20 triệu
                              </button>
                              <button type="button" className="btn btn-primary btn-price-item">
                                 20 triệu - 30 triệu
                              </button>
                              <button type="button" className="btn btn-primary btn-price-item">
                                 30 triệu - 50 triệu
                              </button>
                              <button type="button" className="btn btn-primary btn-price-item">
                                 Trên 50 triệu
                              </button>
                           </div>
                        </div>
                     </div>
                     <div className="products-body-bottom">
                        <ListProduct data={dataRender} />
                     </div>
                  </div>
               </div>
            </div>
            <Footer />
            <BackToTop />
         </div>
      );
   }
}

const mapStateToProps = (state) => ({
   products: state.products,
   quantity_cards: state.quantity_cards,
});

export default connect(mapStateToProps)(Products);
