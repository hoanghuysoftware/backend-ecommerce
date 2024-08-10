import React, { Component } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import './ListProducts.css';

class ListProduct extends Component {
   constructor(props) {
      super(props);
      this.state = {
         iconSale: '/sticker-sale.png',
         numberShow: this.props.numbershow,
         listProduct: this.props.data === undefined ? [] : this.props.data,
         nameBrand: this.props.nameBrand,
         dataPage: this.props.data2,
         pageNumber: this.props.pageNumber,
      };
   }

   async componentDidMount() {
      // this.props.fetchProducts();
      const data = this.props.data;
      if (data !== undefined) {
         this.setState({ listProduct: data });
      }
   }

   render() {
      const { iconSale, numberShow, listProduct } = this.state;
      // console.log(listProduct);
      var numberDynamic = numberShow;
      const productItem = [];
      for (let i = listProduct.length - 1; i >= 0; i--) {
         const product = listProduct[i];
         if (numberDynamic !== 0) {
            productItem.push(
               <div className="product-item" key={i}>
                  <Link to={`/product/${product.id}`} className="product-link">
                     <div className="card product-item__content" style={{ width: '' }}>
                        <div
                           className="card-img-top"
                           style={{ backgroundImage: `url(data:image/jpeg;base64,${product.images[0].imageData})` }}
                        ></div>
                        <div className="card-body">
                           <div className="card-body-name">
                              <p className="card-body-name__content">{product.nameProduct}</p>
                           </div>
                           <div className="card-body-icon">
                              <img src={iconSale} alt="icon sale" />
                           </div>
                           <table className="card-body-table">
                              <tr>
                                 <td className="card-body-title">CPU</td>
                                 <td className="card-body-content">{product.cpuProduct}</td>
                              </tr>
                              <tr>
                                 <td className="card-body-title">RAM</td>
                                 <td className="card-body-content">{product.ramProduct}</td>
                              </tr>
                              <tr>
                                 <td className="card-body-title">Ổ cứng</td>
                                 <td className="card-body-content">{product.romProduct}</td>
                              </tr>
                              <tr>
                                 <td className="card-body-title">Card</td>
                                 <td className="card-body-content">{product.cardProduct}</td>
                              </tr>
                              <tr>
                                 <td className="card-body-title">M.hình</td>
                                 <td className="card-body-content">{product.screenProduct}</td>
                              </tr>
                           </table>
                           <div className="card-body-price">
                              {product.sale !== null ? (
                                 <div className="price-old" style={{ display: 'flex' }}>
                                    <del className="price-old__content">{product.priceProduct.toLocaleString()}đ</del>
                                    <div className="sale-off">
                                       <p className="sale-off__amoung">-{product.sale.amongSale}%</p>
                                    </div>
                                 </div>
                              ) : (
                                 <div className="price-old" style={{ display: 'flex' }}>
                                    <del className="price-old__content"></del>
                                    <div className="sale-off" style={{ backgroundColor: '#fff' }}>
                                       <p className="sale-off__amoung"></p>
                                    </div>
                                 </div>
                              )}
                              <div className="price-new">{product.priceProduct.toLocaleString()}đ</div>
                           </div>
                        </div>
                     </div>
                  </Link>
               </div>,
            );
            numberDynamic--;
         }
      }
      return (
         <div>
            <div className="child-wapper">
               <div className="product-list">{productItem}</div>
            </div>
         </div>
      );
   }
}

export default ListProduct;
