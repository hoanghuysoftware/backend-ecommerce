import React, { Component } from 'react';
import './sale-page.css';
import ApiSaleService from '../../service/saleService';

class SalePage extends Component {
   constructor(props) {
      super(props);
      this.state = {
         nameSale: '',
         dayStart: '',
         dayEnd: '',
         amongSale: '',
         listSale: [],
         idSelected: '',
         isUpdate: false,
      };
   }

   handleChange = (e) => {
      this.setState({
         [e.target.name]: e.target.value,
      });
   };

   handleClickInTable = (id) => {
      this.setState({ idSelected: id });
   };

   async componentDidMount() {
      try {
         const data = await ApiSaleService.getAllSale();
         this.setState({ listSale: data });
      } catch (error) {
         console.log(`Loi khi get Sale o sale page ${error}`);
      }
   }

   handleFormatDay = (input) => {
      const parts = input.split('-');
      const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
      return formattedDate;
   };

   handleSubmit = async (e) => {
      e.preventDefault();
      const postData = {
         nameSale: this.state.nameSale,
         dateStart: this.handleFormatDay(this.state.dayStart),
         dateEnd: this.handleFormatDay(this.state.dayEnd),
         amongSale: this.state.amongSale,
      };
      //   console.log(postData);
      try {
         const response = await ApiSaleService.createNewSale(postData);
         this.setState((prevState) => ({
            listSale: [...prevState.listSale, response],
            nameSale: '',
            dayStart: '',
            dayEnd: '',
            amongSale: '',
         }));
      } catch (error) {
         console.log(`Loi khi them sale ${error}`);
      }
   };

   handleDeleteById = async (e) => {
      e.preventDefault();
      try {
         await ApiSaleService.deleteSaleById(this.state.idSelected);
         const updatedListSale = this.state.listSale.filter((item) => item.id !== parseInt(this.state.idSelected));
         this.setState({ listSale: updatedListSale, idSelected: '' });
         alert('Xoa thanh cong');
      } catch (error) {
         console.log(`Loi khi xoa sale ${error}`);
      }
   };

   handleUpdate = async (e) => {
      e.preventDefault();
      const data = this.state.listSale.filter((item) => item.id === parseInt(this.state.idSelected));
      this.setState({
         nameSale: data[0].nameSale,
         dayStart: this.handleFormatDay(data[0].dateStart),
         dayEnd: this.handleFormatDay(data[0].dateEnd),
         amongSale: data[0].amongSale,
         isUpdate: true,
      });
   };

   handleUpdateMain = async (e) => {
      e.preventDefault();
      const newSale = {
         nameSale: this.state.nameSale,
         dateStart: this.state.dayStart,
         dateEnd: this.state.dayEnd,
         amongSale: this.state.amongSale,
      };
      console.log(newSale);
      this.setState({
         nameSale: '',
         dayStart: '',
         dayEnd: '',
         amongSale: '',
         isUpdate: !this.state.isUpdate,
      });
   };

   render() {
      const { listSale, idSelected, isUpdate } = this.state;
      return (
         <div className="sale-page">
            <div className="sale-title">
               <h2>Khuyến mãi</h2>
            </div>
            <div className="sale-body">
               <div className="sale-left">
                  <h4>Danh sách khuyến mãi</h4>
                  <div className="sale-btn">
                     <button onClick={this.handleUpdate} type="button" className="btn btn-warning">
                        Cập nhật
                     </button>
                     <button onClick={this.handleDeleteById} type="button" className="btn btn-danger">
                        Xóa
                     </button>
                  </div>
                  <table className="table table-hover">
                     <thead>
                        <tr className="table-primary">
                           <th scope="col">ID</th>
                           <th scope="col">Tên khuyến mãi</th>
                           <th scope="col">Ngày bắt đầu</th>
                           <th scope="col">Ngày kết thúc</th>
                           <th scope="col">Phần trăm</th>
                        </tr>
                     </thead>
                     <tbody>
                        {listSale.map((item) => (
                           <tr
                              key={item.id}
                              onClick={() => this.handleClickInTable(`${item.id}`)}
                              className={item.id === parseInt(idSelected) ? 'table-info' : ''}
                           >
                              <th scope="row">{item.id}</th>
                              <td>{item.nameSale}</td>
                              <td>{item.dateStart}</td>
                              <td>{item.dateEnd}</td>
                              <td style={{ color: 'red', fontWeight: '500' }}>{item.amongSale}%</td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
               <div className="sale-right">
                  {isUpdate ? <h4>Form cập nhật</h4> : <h4>Form nhập</h4>}

                  <div className="sale-form">
                     <form onSubmit={isUpdate ? this.handleUpdateMain : this.handleSubmit}>
                        <div className="form-group">
                           <label>Tên khuyến mãi</label>
                           <input
                              onChange={this.handleChange}
                              name="nameSale"
                              value={this.state.nameSale}
                              type="text"
                              className="form-control"
                           />
                        </div>
                        <div className="form-row">
                           <div className="form-group col-md-6">
                              <label>Ngày bắt đầu</label>
                              <input
                                 onChange={this.handleChange}
                                 name="dayStart"
                                 value={this.state.dayStart}
                                 type="date"
                                 className="form-control"
                              />
                           </div>
                           <div className="form-group col-md-6">
                              <label>Ngày kết thúc</label>
                              <input
                                 onChange={this.handleChange}
                                 name="dayEnd"
                                 value={this.state.dayEnd}
                                 type="date"
                                 className="form-control"
                              />
                           </div>
                        </div>
                        <div className="form-group">
                           <label>Phần trăm</label>
                           <input
                              onChange={this.handleChange}
                              name="amongSale"
                              value={this.state.amongSale}
                              type="number"
                              className="form-control"
                           />
                        </div>
                        {isUpdate ? (
                           <button type="submit" className="btn btn-success">
                              Cập nhật
                           </button>
                        ) : (
                           <button type="submit" className="btn btn-success">
                              Lưu
                           </button>
                        )}
                     </form>
                  </div>
               </div>
            </div>
         </div>
      );
   }
}

export default SalePage;
