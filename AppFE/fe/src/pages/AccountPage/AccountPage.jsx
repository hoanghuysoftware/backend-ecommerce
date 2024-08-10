import React, { Component } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './accountPage.css';
import InfoUser from '../../components/InfoUser/InfoUser';
import AddressUser from '../../components/AddressUser/AddressUser';
import PasswordUser from '../../components/PasswordUser/PasswordUser';

class AccountPage extends Component {
   constructor(props) {
      super(props);
      this.state = {
         idUser: localStorage.getItem('idUser'),
      };
   }
   render() {
      return (
         <div className="account-main">
            <Header />
            <div className="account-container">
               <div className="child-wapper">
                  <div className="account-body">
                     <div className="row ">
                        <div className="col-2 account-body-nav">
                           <div className="shadow list-group" id="list-tab" role="tablist">
                              <a
                                 className="list-group-item list-group-item-action active"
                                 id="list-info-user-list"
                                 data-toggle="list"
                                 href="#list-info-user"
                                 role="tab"
                                 aria-controls="info-user"
                              >
                                 Hồ sơ của tôi
                              </a>
                              <a
                                 className="list-group-item list-group-item-action"
                                 id="list-address-list"
                                 data-toggle="list"
                                 href="#list-address"
                                 role="tab"
                                 aria-controls="address"
                              >
                                 Địa chỉ của tôi
                              </a>
                              <a
                                 className="list-group-item list-group-item-action"
                                 id="list-password-list"
                                 data-toggle="list"
                                 href="#list-password"
                                 role="tab"
                                 aria-controls="password"
                              >
                                 Đổi mật khẩu
                              </a>
                           </div>
                        </div>
                        <div className="col-10 account-body-content">
                           <div className="tab-content" id="nav-tabContent">
                              <div
                                 className="tab-pane fade show active"
                                 id="list-info-user"
                                 role="tabpanel"
                                 aria-labelledby="list-info-user-list"
                              >
                                 <InfoUser />
                              </div>
                              <div
                                 className="tab-pane fade"
                                 id="list-address"
                                 role="tabpanel"
                                 aria-labelledby="list-address-list"
                              >
                                 <AddressUser id={this.state.idUser} />
                              </div>
                              <div
                                 className="tab-pane fade"
                                 id="list-password"
                                 role="tabpanel"
                                 aria-labelledby="list-password-list"
                              >
                                 <PasswordUser />
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <Footer />
         </div>
      );
   }
}

export default AccountPage;
