import React, { Component } from 'react';
import './info-user.css';
import ApiCustormerService from '../../service/userService';

class InfoUser extends Component {
   constructor(props) {
      super(props);
      this.state = {
         idUser: localStorage.getItem('idUser'),
         user: '',
      };
   }
   async componentDidMount() {
      const response = await ApiCustormerService.getCustomersById(this.state.idUser);
      this.setState({
         user: response,
      });
   }
   render() {
      const { user } = this.state;
      return (
         <div className="info-user-main shadow">
            <div className="info-user-top">
               <h2 className="info-user-title">Hồ sơ của tôi</h2>
               <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
            </div>
            <div className="info-user-body">
               <div className="info-user-body-table">
                  <table className="table table-borderless">
                     <tbody>
                        <tr className="info-user-col">
                           <td className="info-user-col-title">Tên người dùng</td>
                           <td className="info-user-col-data">{user.nameCustomer}</td>
                        </tr>
                        <tr className="info-user-col">
                           <td className="info-user-col-title">E-mail</td>
                           <td className="info-user-col-data">{user.emailCus}</td>
                        </tr>
                        <tr className="info-user-col">
                           <td className="info-user-col-title">Số điện thoại</td>
                           <td className="info-user-col-data">{user.phoneNumber}</td>
                        </tr>
                        <tr className="info-user-col">
                           <td className="info-user-col-title">Giới tính</td>
                           <td className="info-user-col-data">
                              <div className="info-user-data-radio" style={{ display: 'flex' }}>
                                 <div className="form-check">
                                    <input
                                       className="form-check-input"
                                       type="radio"
                                       name="gender"
                                       id="man"
                                       value={1}
                                       checked
                                    />
                                    <label className="form-check-label" for="man">
                                       Nam
                                    </label>
                                 </div>
                                 <div className="form-check">
                                    <input
                                       className="form-check-input"
                                       type="radio"
                                       name="gender"
                                       id="girl"
                                       value={2}
                                    />
                                    <label className="form-check-label" for="girl">
                                       Nữ
                                    </label>
                                 </div>
                              </div>
                           </td>
                        </tr>
                        <tr className="info-user-col">
                           <td className="info-user-col-title">Ngày sinh</td>
                           <td className="info-user-col-data">{user.birthDayCus}</td>
                        </tr>
                     </tbody>
                  </table>
               </div>
            </div>
            <div className="info-user-bottom"></div>
         </div>
      );
   }
}

export default InfoUser;
