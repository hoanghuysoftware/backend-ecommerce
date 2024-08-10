import React, { Component } from 'react';
import './address-user.css';
import data from './address.json';
import ApiAddressService from '../../service/addressService';
import ApiCustormerService from '../../service/userService';

class AddressUser extends Component {
   constructor(props) {
      super(props);
      this.state = {
         selectedProvince: null,
         selectedDistrict: null,
         selectedWard: null,
         province: '',
         district: '',
         ward: '',
         detailAddress: '',
         idUser: this.props.id,
         user: '',
         isUpdate: false,
         idUpdate: '',
         inputAddress: '',
      };
   }
   handChange = (e) => {
      this.setState({
         [e.target.name]: e.target.value,
      });
   };

   handleProvinceChange = (event) => {
      const selectedProvinceId = event.target.value;
      const selectedProvince = data.find((province) => province.Id === selectedProvinceId);
      // console.log(selectedProvince);
      this.setState({
         selectedProvince: selectedProvince,
         selectedDistrict: null,
         selectedWard: null,
         province: selectedProvince.Name,
      });
   };

   handleDistrictChange = (event) => {
      const selectedDistrictId = event.target.value;
      const selectedDistrict = this.state.selectedProvince.Districts.find(
         (district) => district.Id === selectedDistrictId,
      );
      this.setState({
         selectedDistrict: selectedDistrict,
         selectedWard: null,
         district: selectedDistrict.Name,
      });
   };

   handleWardChange = (event) => {
      const selectedWardId = event.target.value;
      const selectedWard = this.state.selectedDistrict.Wards.find((ward) => ward.Id === selectedWardId);
      this.setState({
         selectedWard: selectedWard,
         ward: selectedWard.Name,
      });
   };
   async componentDidMount() {
      const { idUser } = this.state;
      try {
         const info = await ApiCustormerService.getCustomersById(idUser);
         this.setState({ user: info });
         console.log(info);
      } catch (error) {
         console.log(`Loi khi lay thong tin nguoi dung tai AddressUser: ${error.message}`);
      }
   }

   handleSubmit = async () => {
      const { province, ward, district, detailAddress, idUser } = this.state;
      const address = `${detailAddress}, ${ward}, ${district}, ${province}`;
      const postData = {
         idUser: idUser,
         nameAddress: address,
      };
      try {
         const data = await ApiAddressService.addNewAddress(postData);
         const updatedAddresses = [...this.state.user.addresses, data];
         this.setState((prevState) => ({
            user: {
               ...prevState.user,
               addresses: updatedAddresses,
            },
         }));
         this.render();
      } catch (error) {
         console.log('Loi khi them dia chi moi tai AddressUser: ', error.message);
      }
   };

   handleDelete = async (id) => {
      try {
         const data = await ApiAddressService.deleteAddress(parseInt(id));
         const updatedAddresses = this.state.user.addresses.filter((address) => address.id !== id);
         this.setState((prevState) => ({
            user: {
               ...prevState.user,
               addresses: updatedAddresses,
            },
         }));
      } catch (error) {
         console.log(`Loi khi xoa dia chi tai AddressUser: ${error.message}`);
      }
   };
   handlCLickBtnUpdate = (id) => {
      this.setState({
         isUpdate: true,
         idUpdate: id,
      });
   };
   handlCLickBtnAddNew = () => {
      this.setState({
         isUpdate: false,
         idUpdate: '',
         selectedProvince: null,
         selectedDistrict: null,
         selectedWard: null,
      });
   };
   handleUpdate = async (id) => {
      const { province, ward, district, detailAddress } = this.state;
      const address = `${detailAddress}, ${ward}, ${district}, ${province}`;
      const postData = {
         nameAddress: address,
      };
      try {
         const data = await ApiAddressService.updateAddress(parseInt(id), postData);
         const updatedAddresses = this.state.user.addresses.map((address) => {
            if (address.id === parseInt(id)) {
               return data;
            }
            return address;
         });
         this.setState((prevState) => ({
            user: {
               ...prevState.user,
               addresses: updatedAddresses,
               isUpdate: false,
               idUpdate: '',
            },
         }));
      } catch (error) {
         console.log(`Loi khi cap nhat dia chi tai AddressUser: ${error.message}`);
      }
   };

   render() {
      const { selectedProvince, selectedDistrict, user, isUpdate } = this.state;

      return (
         <div className="address-user-main shadow">
            <div className="address-user-content">
               <div className="address-user-top">
                  <div>
                     <h2 className="address-user-title">Địa chỉ của tôi</h2>
                     <p>Quản lý thông tin địa chỉ của bạn</p>
                  </div>
                  <button
                     type="button"
                     className="btn btn-primary btn-add-address"
                     data-toggle="modal"
                     data-target="#address-modal"
                     onClick={() => this.handlCLickBtnAddNew()}
                  >
                     <i style={{ marginRight: '5px' }} className="fa-solid fa-plus"></i>
                     Thêm địa chỉ mới
                  </button>
               </div>
               <div
                  className="modal fade"
                  id="address-modal"
                  tabindex="-1"
                  aria-labelledby="address-modalLabel"
                  aria-hidden="true"
               >
                  <div className="modal-dialog">
                     <div className="modal-content">
                        <div className="modal-header">
                           <h5 className="modal-title" id="address-modalLabel">
                              {isUpdate ? 'Cập nhật địa chỉ' : 'Thêm địa chỉ mới'}
                           </h5>
                           <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                           </button>
                        </div>
                        <div className="modal-body">
                           <form>
                              <div class="form-group">
                                 <div style={{ display: 'flex' }}>
                                    <select className="custom-select" onChange={this.handleProvinceChange}>
                                       <option selected disabled>
                                          Chọn tỉnh/thành phố
                                       </option>
                                       {data.map((province) => (
                                          <option
                                             onChange={this.handChange}
                                             name="province"
                                             key={province.Id}
                                             value={province.Id}
                                          >
                                             {province.Name}
                                          </option>
                                       ))}
                                    </select>

                                    {selectedProvince && (
                                       <select className="custom-select" onChange={this.handleDistrictChange}>
                                          <option selected disabled>
                                             Chọn quận/huyện
                                          </option>
                                          {selectedProvince.Districts.map((district) => (
                                             <option
                                                onChange={this.handChange}
                                                name="district"
                                                key={district.Id}
                                                value={district.Id}
                                             >
                                                {district.Name}
                                             </option>
                                          ))}
                                       </select>
                                    )}

                                    {selectedDistrict && (
                                       <select className="custom-select" onChange={this.handleWardChange}>
                                          <option selected disabled>
                                             Chọn phường/xã
                                          </option>
                                          {selectedDistrict.Wards.map((ward) => (
                                             <option
                                                onChange={this.handChange}
                                                name="ward"
                                                key={ward.Id}
                                                value={ward.Id}
                                             >
                                                {ward.Name}
                                             </option>
                                          ))}
                                       </select>
                                    )}
                                 </div>
                                 <label for="detail-address">Mô tả chi tiết</label>
                                 <input
                                    type="text"
                                    name="detailAddress"
                                    onChange={this.handChange}
                                    value={this.state.detailAddress}
                                    className="form-control"
                                    id="detail-address"
                                 />
                              </div>
                           </form>
                        </div>
                        <div className="modal-footer">
                           <button type="button" className="btn btn-secondary" data-dismiss="modal">
                              Đóng
                           </button>
                           {isUpdate ? (
                              <button
                                 type="button"
                                 onClick={() => this.handleUpdate(this.state.idUpdate)}
                                 className="btn btn-primary"
                              >
                                 Cập nhật
                              </button>
                           ) : (
                              <button type="button" onClick={this.handleSubmit} className="btn btn-primary">
                                 Lưu
                              </button>
                           )}
                        </div>
                     </div>
                  </div>
               </div>
               <div className="address-user-body">
                  <h5>Danh sách địa chỉ</h5>
                  <div className="address-user-list">
                     {user &&
                        user.addresses.map((item, index) => (
                           <div key={index} className="address-user-item">
                              <div className="address-user-data">{item.dataAddress}</div>
                              <div className="address-user-control">
                                 <button
                                    type="button"
                                    className="btn btn-success"
                                    data-toggle="modal"
                                    data-target="#address-modal"
                                    onClick={() => this.handlCLickBtnUpdate(item.id)}
                                 >
                                    Cập nhật
                                 </button>
                                 <button
                                    onClick={() => this.handleDelete(item.id)}
                                    type="button"
                                    className="btn btn-danger"
                                 >
                                    Xóa
                                 </button>
                              </div>
                           </div>
                        ))}
                  </div>
               </div>
               <div className="address-user-bottom"></div>
            </div>
         </div>
      );
   }
}

export default AddressUser;
