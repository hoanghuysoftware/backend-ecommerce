import React, { Component } from 'react';
import './password-user.css';

class PasswordUser extends Component {
   constructor(props) {
      super(props);
      this.state = {};
   }
   render() {
      return (
         <div className="password-user-main shadow">
            <div className="password-user-top">
               <h2 className="address-user-title">Đổi mật khẩu</h2>
               <p>Quản lý mật khẩu của bạn</p>
            </div>
            <div className="password-user-body">
               <form>
                  <div className="form-group">
                     <label for="password-old">Mật khẩu cũ</label>
                     <input type="password" className="form-control" id="password-old" placeholder="Nhập nật khẩu cũ" />
                  </div>
                  <div className="form-group">
                     <label for="password-new">Nhập mật khẩu mới</label>
                     <input
                        type="password"
                        className="form-control"
                        id="password-new"
                        placeholder="Nhập mật khẩu mới"
                     />
                  </div>
                  <div className="form-group">
                     <label for="password-re-new">Nhập lại mật khẩu mới</label>
                     <input
                        type="password"
                        className="form-control"
                        id="password-re-new"
                        placeholder="Nhập lại mật khẩu"
                     />
                  </div>
                  <button type="submit" className="btn btn-primary">
                     Xác nhận
                  </button>
               </form>
            </div>
            <div className="password-user-bottom"></div>
         </div>
      );
   }
}

export default PasswordUser;
