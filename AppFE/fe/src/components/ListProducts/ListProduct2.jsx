import React, { Component } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import './ListProducts.css';

class ListProduct2 extends Component {
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

   componentDidMount() {
      const data = this.state.dataPage;
      this.setState({
         listProduct: data,
      });
   }

   render() {
      const { iconSale, listProduct } = this.state;
      console.log(listProduct);
      return (
         <div>
            <div className="child-wapper">
               <div className="product-list">
                  {listProduct &&
                     listProduct.map((item, index) => (
                        <div className="product-item" key={index}>
                           <Link to={`/product/${item.id}`} className="product-link">
                              <div className="card product-item__content" style={{ width: '' }}>
                                 <div
                                    className="card-img-top"
                                    style={{
                                       backgroundImage: `url(data:image/jpeg;base64,${item.images[0].imageData})`,
                                    }}
                                 ></div>
                                 <div className="card-body">
                                    <div className="card-body-name">
                                       <p className="card-body-name__content">{item.nameProduct}</p>
                                    </div>
                                    <div className="card-body-icon">
                                       <img src={iconSale} alt="icon sale" />
                                    </div>
                                    <table className="card-body-table">
                                       <thead></thead>
                                       <tbody>
                                          <tr>
                                             <td className="card-body-title">CPU</td>
                                             <td className="card-body-content">{item.cpuProduct}</td>
                                          </tr>
                                          <tr>
                                             <td className="card-body-title">RAM</td>
                                             <td className="card-body-content">{item.ramProduct}</td>
                                          </tr>
                                          <tr>
                                             <td className="card-body-title">Ổ cứng</td>
                                             <td className="card-body-content">{item.romProduct}</td>
                                          </tr>
                                          <tr>
                                             <td className="card-body-title">Card</td>
                                             <td className="card-body-content">{item.cardProduct}</td>
                                          </tr>
                                          <tr>
                                             <td className="card-body-title">M.hình</td>
                                             <td className="card-body-content">{item.screenProduct}</td>
                                          </tr>
                                       </tbody>
                                    </table>
                                    <div className="card-body-price">
                                       {item.sale !== null ? (
                                          <div className="price-old" style={{ display: 'flex' }}>
                                             <del className="price-old__content">17.000.000đ</del>
                                             <div className="sale-off">
                                                <p className="sale-off__amoung">-10%</p>
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
                                       <div className="price-new">{item.priceProduct.toLocaleString()}đ</div>
                                    </div>
                                 </div>
                              </div>
                           </Link>
                        </div>
                     ))}
               </div>
            </div>
         </div>
      );
   }
}

export default ListProduct2;
