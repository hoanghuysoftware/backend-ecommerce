import React, { useEffect, useCallback } from 'react';
import './App.css';
import Home from './pages/HomePage/Home';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import Review from './pages/ReviewPage/Review';
import Products from './pages/Products/Products';
import Login from './pages/Login/Login';
import MainControl from './admin/MainControl/MainControl';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { setProduct, setNumberInCart } from './redux/action';
import Cart from './pages/CartPage/Cart';
import ApiProductService from './service/productService';
import Checkout from './pages/Checkout/Checkout';
import PaySuccess from './pages/PaySuccess/PaySuccess';
import ApiCustormerService from './service/userService';
import Order from './pages/Order/Order';
import OrderDetails from './pages/OrderDetail/OrderDetail';
import AccountPage from './pages/AccountPage/AccountPage';
import Search from './pages/SearchPage/Search';

function App({ setProduct, setNumberInCart }) {
   const fetchData = useCallback(async () => {
      try {
         const data = await ApiProductService.getAllProduct();
         setProduct(data);
      } catch (error) {
         console.log('Error fetching data:', error);
      }
      try {
         const data = await ApiCustormerService.getCustomersById(localStorage.getItem('idUser'));
         setNumberInCart(data.cart.quantityCart);
      } catch (error) {
         console.log('Error fetching data:', error);
      }
   }, [setProduct, setNumberInCart]);

   useEffect(() => {
      fetchData();
   }, [fetchData]);

   return (
      <div className="App">
         <Router>
            <Switch>
               <Route exact path="/" component={Home} />
               <Route exact path="/login" component={Login} />
               <Route path="/admin" component={MainControl} />
               <Route path="/check-out" component={Checkout} />
               <Route path="/pay-success" component={PaySuccess} />
               <Route path="/search" component={Search} />
               <Route path="/order/customer/:idUser/details/:id" component={OrderDetails} />
               <Route path="/orders/:id" component={Order} />
               <Route path="/account-info/:id" component={AccountPage} />
               <Route path="/product/:id" component={ProductDetail} />
               <Route path="/review/:id" component={Review} />
               <Route path="/products/:nameType" component={Products} />
               <Route path="/cart/:idUser" component={Cart} />
            </Switch>
         </Router>
      </div>
   );
}

const mapStateToProps = (state) => ({
   products: state.products,
   quantity_cards: state.quantity_cards,
});

const mapDispatchToProps = {
   setProduct,
   setNumberInCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
