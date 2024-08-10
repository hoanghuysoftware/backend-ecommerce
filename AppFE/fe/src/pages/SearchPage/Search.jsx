import React, { Component } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import ApiProductService from '../../service/productService';
import ListProduct2 from '../../components/ListProducts/ListProduct2';
import { Link } from 'react-router-dom/cjs/react-router-dom';

class Search extends Component {
   constructor(props) {
      super(props);
      this.state = {
         searchText: '',
         listProducts: '',
         page: 0,
         totalPage: 0,
         currentPage: 0,
      };
   }

   async componentDidMount() {
      const searchText = new URLSearchParams(this.props.location.search).get('name-product');
      await this.fetchProducts(searchText, 0);
   }

   fetchProducts = async (searchText, page) => {
      //   console.log(page);
      try {
         const data = await ApiProductService.searchProduct(searchText, parseInt(page));
         this.setState({
            listProducts: data.content,
            searchText: searchText,
            totalPage: data.totalPages,
            currentPage: page,
         });
         //  console.log(data);
      } catch (error) {
         console.log(`Error fetching products on SearchPage: ${error.message}`);
      }
   };

   handlePageChange = (pageNumber) => {
      this.fetchProducts(this.state.searchText, pageNumber);
   };

   render() {
      const { listProducts, searchText, currentPage, totalPage } = this.state;
      return (
         <div className="search-main">
            <Header />
            <div className="search-container" style={{ backgroundColor: '#eaeaea' }}>
               <div className="child-wapper">
                  <div className="search-top">
                     <h3 className="search-top-text">Kết quả tìm kiếm cho: {searchText}</h3>
                     <p className="search-top-number">{listProducts ? listProducts.length : 0} sản phẩm phù hợp</p>
                  </div>
                  <div className="search-body">
                     {listProducts && <ListProduct2 data2={listProducts} pageNumber={currentPage} />}
                  </div>
                  <div className="search-bottom">
                     <nav aria-label="Page navigation example">
                        <ul className="pagination justify-content-center">
                           <li className={`page-item ${currentPage === 0 ? 'disabled' : ''}`}>
                              <Link
                                 className="page-link"
                                 onClick={() => this.handlePageChange(currentPage - 1)}
                                 to={`?name-product=${searchText}&page=${currentPage - 1}`}
                              >
                                 Previous
                              </Link>
                           </li>
                           {[...Array(totalPage).keys()].map((page) => (
                              <li key={page} className={`page-item ${page === currentPage ? 'active' : ''}`}>
                                 <Link
                                    className="page-link"
                                    onClick={() => this.handlePageChange(page)}
                                    to={`?name-product=${searchText}&page=${page}`}
                                 >
                                    {page + 1}
                                 </Link>
                              </li>
                           ))}
                           <li className={`page-item ${currentPage === totalPage - 1 ? 'disabled' : ''}`}>
                              <Link
                                 className="page-link"
                                 onClick={() => this.handlePageChange(currentPage + 1)}
                                 to={`?name-product=${searchText}&page=${currentPage + 1}`}
                              >
                                 Next
                              </Link>
                           </li>
                        </ul>
                     </nav>
                  </div>
               </div>
            </div>
            <Footer />
         </div>
      );
   }
}

export default Search;
