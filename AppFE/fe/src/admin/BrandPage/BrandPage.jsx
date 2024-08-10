import React, { Component } from 'react';
import './brand-page.css';
import ApiBrandService from '../../service/brandService';

class BrandPage extends Component {
   constructor(props) {
      super(props);
      this.state = {
         nameBrand: '',
         listBrand: [],
      };
   }

   handleChangInput = (e) => {
      this.setState({
         [e.target.name]: e.target.value,
      });
   };

   handleSubmitForm = async (e) => {
      e.preventDefault();
      const nameBrand = this.state.nameBrand;
      const data = {
         nameBrand,
      };
      const response = await ApiBrandService.createNewBrand(data);
      this.setState((prevState) => ({
         listBrand: [...prevState.listBrand, response],
         nameBrand: '', // Clear the input field after successful submission
      }));
   };

   async componentDidMount() {
      try {
         const brands = await ApiBrandService.getAllBrand();
         this.setState({ listBrand: brands });
      } catch (error) {
         console.log('Loi khi lay brand');
      }
   }

   render() {
      const { listBrand } = this.state;
      return (
         <div className="brand-page">
            <h2 className="brand-title">Thương Hiệu</h2>
            <div className="brand-body">
               <div className="brand-left">
                  <h3>Danh sách thương hiệu</h3>
                  <table className="table table-hover">
                     <thead>
                        <tr className="table-primary">
                           <th scope="col">ID</th>
                           <th scope="col">Tên thương hiệu</th>
                        </tr>
                     </thead>
                     <tbody>
                        {listBrand.map((brand) => (
                           <tr key={brand.id}>
                              <th scope="row">{brand.id}</th>
                              <td>{brand.nameBrand}</td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
               <div className="brand-right">
                  <h3>Form nhập</h3>
                  <form onSubmit={this.handleSubmitForm} className="form-input-brand">
                     <div className="form-group">
                        <p>Tên thương hiệu</p>
                        <input
                           value={this.state.nameBrand}
                           onChange={this.handleChangInput}
                           type="text"
                           name="nameBrand"
                           className="form-control"
                        />
                     </div>
                     <button type="submit" className="btn btn-primary">
                        Thêm
                     </button>
                  </form>
               </div>
            </div>
         </div>
      );
   }
}

export default BrandPage;
