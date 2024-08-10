import React, { Component } from 'react';
import './import-page.css';
import ApiProductService from '../../service/productService';
import APiImportService from '../../service/importService';
import ApiBrandService from '../../service/brandService';
import ApiProductAttribute from '../../service/productAttributeService';
import ApiReceiptService from '../../service/receiptService';

class ImportPage extends Component {
   constructor(props) {
      super(props);
      this.state = {
         products: [],
         importerId: 1,
         priceImport: '',
         quantityImport: '',
         nameProduct: '',
         ramProduct: '',
         cpuProduct: '',
         screenProduct: '',
         romProduct: '',
         cardProduct: '',
         descProduct: '',
         priceProduct: '',
         quantityProduct: '',
         productAttributesId: [],
         brandId: 1,
         images: [],
         listProduct: [],
         listImporter: [],
         listBrand: [],
         listAttribute: [],
      };
   }

   handleChange = (e) => {
      this.setState({
         [e.target.name]: e.target.value,
      });
   };
   handleChangeCheckBox = (e) => {
      const { name, value, checked } = e.target;

      if (checked) {
         // Nếu checkbox được chọn, thêm giá trị mới vào mảng
         this.setState((prevState) => ({
            [name]: [...prevState[name], parseInt(value)],
         }));
      } else {
         // Nếu checkbox bị hủy chọn, loại bỏ giá trị khỏi mảng
         this.setState((prevState) => ({
            [name]: prevState[name].filter((val) => val !== parseInt(value)),
         }));
      }
   };

   handleSubmit = (e) => {
      e.preventDefault();
      const newProduct = {
         importerId: this.state.importerId,
         priceImport: this.state.priceImport,
         quantityImport: this.state.quantityImport,
         nameProduct: this.state.nameProduct,
         ramProduct: this.state.ramProduct,
         cpuProduct: this.state.cpuProduct,
         screenProduct: this.state.screenProduct,
         romProduct: this.state.romProduct,
         cardProduct: this.state.cardProduct,
         descProduct: this.state.descProduct,
         priceProduct: this.state.priceProduct,
         quantityProduct: this.state.quantityProduct,
         productAttributesId: this.state.productAttributesId,
         brandId: this.state.brandId,
         images: this.state.images,
      };
      this.setState((prevState) => ({
         products: [...prevState.products, newProduct],
         priceImport: '',
         quantityImport: '',
         nameProduct: '',
         ramProduct: '',
         cpuProduct: '',
         screenProduct: '',
         romProduct: '',
         cardProduct: '',
         descProduct: '',
         priceProduct: '',
         quantityProduct: '',
         productAttributesId: [],
         brandId: this.state.brandId,
         images: [],
      }));
   };

   showImages = () => {
      const { images } = this.state;
      return (
         <div style={{ display: 'flex' }}>
            {images.map((image, index) => (
               <div key={index}>
                  <img
                     src={`data:image/jpeg;base64,${this.arrayBufferToBase64(image)}`}
                     width="100px"
                     alt={`${index}`}
                  />
               </div>
            ))}
         </div>
      );
   };

   arrayBufferToBase64 = (buffer) => {
      let binary = '';
      const bytes = new Uint8Array(buffer);
      const len = bytes.byteLength;
      for (let i = 0; i < len; i++) {
         binary += String.fromCharCode(bytes[i]);
      }
      return window.btoa(binary);
   };

   showImagesInTable = (images) => {
      return (
         <div style={{ display: 'flex' }}>
            {images.map((image, index) => (
               <div key={index}>
                  <img
                     src={`data:image/jpeg;base64,${this.arrayBufferToBase64(image)}`}
                     width="50px"
                     alt={`${index}`}
                  />
               </div>
            ))}
         </div>
      );
   };
   showImagesInTable2 = (images) => {
      return (
         <div style={{ display: 'flex' }}>
            {images.map((image, index) => (
               <div key={index}>
                  <img src={`data:image/jpeg;base64,${image.imageData}`} width="50px" alt={`${index}`} />
               </div>
            ))}
         </div>
      );
   };
   imageToByteArray = async (imageFile) => {
      return new Promise((resolve, reject) => {
         const reader = new FileReader();

         reader.onload = (event) => {
            const arrayBuffer = event.target.result;
            const bytes = new Uint8Array(arrayBuffer);
            resolve(Array.from(bytes)); // Chuyển đổi Uint8Array thành mảng số nguyên
         };

         reader.onerror = (error) => {
            reject(error);
         };

         reader.readAsArrayBuffer(imageFile);
      });
   };
   imagesToByteArray = async (imageFiles) => {
      try {
         const byteArrays = [];
         for (const imageFile of imageFiles) {
            const byteArray = await this.imageToByteArray(imageFile);
            byteArrays.push(byteArray);
         }
         return byteArrays;
      } catch (error) {
         throw error;
      }
   };
   handleImageChange = async (e) => {
      try {
         const imageFiles = e.target.files;
         const byteArrays = await this.imagesToByteArray(imageFiles);
         this.setState({
            images: byteArrays,
         });
      } catch (error) {
         console.error('Đã xảy ra lỗi khi chuyển đổi ảnh thành mảng byte:', error);
      }
   };

   handleSave = async (e) => {
      e.preventDefault();
      const { products } = this.state;
      const postData = {
         importerId: this.state.importerId,
         adminId: 1,
         details: products.map((item) => ({
            priceImport: item.priceImport,
            quantityImport: item.quantityImport,
            productId: null,
            productRequest: {
               nameProduct: item.nameProduct,
               cpuProduct: item.cpuProduct,
               ramProduct: item.ramProduct,
               screenProduct: item.screenProduct,
               romProduct: item.romProduct,
               cardProduct: item.cardProduct,
               descProduct: item.descProduct,
               priceProduct: item.priceProduct,
               quantityProduct: item.quantityProduct,
               brandId: item.brandId,
               attributeIds: [parseInt(item.productAttributesId)],
               images: item.images,
            },
         })),
      };
      try {
         const response = await ApiReceiptService.createNewProduct(postData);
         console.log(response);
         const dataListProduct = await ApiProductService.getAllProduct();
         const rm2DataListProduct = dataListProduct.slice(2);
         this.setState({ listProduct: rm2DataListProduct });
         this.setState({ products: [] });
         await this.loadDataFromServer();
      } catch (error) {
         console.log(`Loi khi them san pham moi dong 219 ${error}`);
      }
   };

   async componentDidMount() {
      this.loadDataFromServer();
   }

   async loadDataFromServer() {
      try {
         const dataListProduct = await ApiProductService.getAllProduct();
         const rm2DataListProduct = dataListProduct.slice(2);
         this.setState({ listProduct: rm2DataListProduct });
      } catch (error) {
         console.log(`Loi khi lay san pham tai importPage: ${error}`);
      }
      try {
         const dataImporter = await APiImportService.getAllImport();
         this.setState({ listImporter: dataImporter });
      } catch (error) {
         console.log(`Loi khi lay importer tai importPage: ${error}`);
      }
      try {
         const dataBrand = await ApiBrandService.getAllBrand();
         this.setState({ listBrand: dataBrand });
      } catch (error) {
         console.log(`Loi khi lay brand tai importPage: ${error}`);
      }
      try {
         const dataAttribute = await ApiProductAttribute.getAllAttribute();
         this.setState({ listAttribute: dataAttribute });
      } catch (error) {
         console.log(`Loi khi lay Attribute tai importPage: ${error}`);
      }
   }

   render() {
      const { listImporter, listBrand, listAttribute } = this.state;
      return (
         <div className="import-page">
            <div className="import-title">
               <h2>Nhập hàng</h2>
            </div>
            <div className="import-body">
               <div className="import-left">
                  <h4>Form nhập hàng</h4>
                  <form onSubmit={this.handleSubmit}>
                     <div>
                        <div className="form-group">
                           <p>Chọn nhà cung cấp:</p>
                           <select
                              className="form-control"
                              name="importerId"
                              value={this.state.importerId}
                              onChange={this.handleChange}
                           >
                              {listImporter.map((importer) => (
                                 <option key={importer.id} value={importer.id}>
                                    {importer.nameImporter}
                                 </option>
                              ))}
                           </select>
                        </div>
                     </div>
                     <div>
                        <p>Giá nhập hàng:</p>
                        <input
                           type="number"
                           name="priceImport"
                           value={this.state.priceImport}
                           onChange={this.handleChange}
                        />
                     </div>
                     <div>
                        <p>Số lượng:</p>
                        <input
                           type="number"
                           name="quantityImport"
                           value={this.state.quantityImport}
                           onChange={this.handleChange}
                        />
                     </div>
                     <div>
                        <p>Tên sản phẩm:</p>
                        <input
                           type="text"
                           name="nameProduct"
                           value={this.state.nameProduct}
                           onChange={this.handleChange}
                        />
                     </div>
                     <div>
                        <p>RAM:</p>
                        <input
                           type="text"
                           name="ramProduct"
                           value={this.state.ramProduct}
                           onChange={this.handleChange}
                        />
                     </div>
                     <div>
                        <p>CPU:</p>
                        <input
                           type="text"
                           name="cpuProduct"
                           value={this.state.cpuProduct}
                           onChange={this.handleChange}
                        />
                     </div>
                     <div>
                        <p>M.Hình:</p>
                        <input
                           type="text"
                           name="screenProduct"
                           value={this.state.screenProduct}
                           onChange={this.handleChange}
                        />
                     </div>
                     <div>
                        <p>ROM:</p>
                        <input
                           type="text"
                           name="romProduct"
                           value={this.state.romProduct}
                           onChange={this.handleChange}
                        />
                     </div>
                     <div>
                        <p>Card:</p>
                        <input
                           type="text"
                           name="cardProduct"
                           value={this.state.cardProduct}
                           onChange={this.handleChange}
                        />
                     </div>
                     <div>
                        <p>Mô tả chi tiết:</p>
                        <input
                           type="text"
                           name="descProduct"
                           value={this.state.descProduct}
                           onChange={this.handleChange}
                        />
                     </div>
                     <div>
                        <p>Giá sản phẩm:</p>
                        <input
                           type="number"
                           name="priceProduct"
                           value={this.state.priceProduct}
                           onChange={this.handleChange}
                        />
                     </div>
                     <div>
                        <p>Số lượng còn:</p>
                        <input
                           type="number"
                           name="quantityProduct"
                           value={this.state.quantityProduct}
                           onChange={this.handleChange}
                        />
                     </div>
                     <div>
                        <p style={{ fontWeight: '500' }}>Chọn thuộc tính sản phẩm:</p>

                        <div className="form-group import-check-list">
                           {listAttribute.map((attribute, index) => (
                              <div key={index} className="import-check-item form-check">
                                 <input
                                    className="form-check-input"
                                    name="productAttributesId"
                                    type="checkbox"
                                    value={attribute.id}
                                    checked={this.state.productAttributesId.includes(attribute.id)}
                                    onChange={this.handleChangeCheckBox}
                                    id={`option${attribute.id}`}
                                 />
                                 <label className="form-check-label" htmlFor={`option${attribute.id}`}>
                                    {attribute.nameAttribute}
                                 </label>
                              </div>
                           ))}
                        </div>
                     </div>
                     <div>
                        <p>Chọn thương hiệu:</p>
                        <select
                           className="form-control"
                           name="brandId"
                           value={this.state.brandId}
                           onChange={this.handleChange}
                        >
                           {listBrand.map((brand) => (
                              <option key={brand.id} value={brand.id}>
                                 {brand.nameBrand}
                              </option>
                           ))}
                        </select>
                     </div>
                     <div>
                        <p>Ảnh sản phẩm:</p>
                        <input type="file" name="images" onChange={this.handleImageChange} multiple />
                     </div>
                     <button type="submit" className="btn btn-success">
                        Lưu sản phẩm
                     </button>
                  </form>
                  {this.showImages()}
               </div>
               <div className="import-right">
                  <div className="import-data-table">
                     <h3>Danh sách sản phẩm muốn nhập</h3>
                     <div className="import-table">
                        <table className="table table-hover">
                           <thead className="table-title">
                              <tr className="table-primary">
                                 <th>Nhà cung cấp</th>
                                 <th>Giá nhập</th>
                                 <th>Số lượng</th>
                                 <th>Tên sản phẩm</th>
                                 <th>RAM</th>
                                 <th>CPU</th>
                                 <th>M.Hình:</th>
                                 <th>ROM</th>
                                 <th>Card</th>
                                 <th>Mô tả chi tiết</th>
                                 <th>Giá sản phẩm</th>
                                 <th>Số lượng còn</th>
                                 <th>Thuộc tính sản phẩm</th>
                                 <th>Thương hiệu</th>
                                 <th>Ảnh sản phẩm</th>
                                 {/* Add other table headers similarly */}
                              </tr>
                           </thead>
                           <tbody className="table-body">
                              {this.state.products.map((product, index) => (
                                 <tr className="tr-item" key={index}>
                                    <th>{product.importerId}</th>
                                    <td>{product.priceImport}</td>
                                    <td>{product.quantityImport}</td>
                                    <td className="td-name">{product.nameProduct}</td>
                                    <td>{product.ramProduct}</td>
                                    <td>{product.cpuProduct}</td>
                                    <td>{product.screenProduct}</td>
                                    <td>{product.romProduct}</td>
                                    <td>{product.cardProduct}</td>
                                    <td className="td-desc">{product.descProduct}</td>
                                    <td>{product.priceProduct}</td>
                                    <td>{product.quantityProduct}</td>
                                    <td>
                                       {product.productAttributesId.map((attribute, index) => (
                                          <span key={index}>{attribute}, </span>
                                       ))}
                                    </td>
                                    <td>{product.brandId}</td>
                                    <td>{this.showImagesInTable(product.images)}</td>
                                 </tr>
                              ))}
                           </tbody>
                        </table>
                     </div>
                     <button type="button" onClick={this.handleSave} className="btn btn-info">
                        Nhập hàng
                     </button>
                  </div>
                  <div className="import-data-table">
                     <h3>Danh sách sản phẩm</h3>
                     <div className="import-data-table">
                        <div className="import-table">
                           <table className="table table-hover">
                              <thead className="table-title">
                                 <tr className="table-primary">
                                    <th>Tên sản phẩm</th>
                                    <th>RAM</th>
                                    <th>CPU</th>
                                    <th>M.Hình:</th>
                                    <th>ROM</th>
                                    <th>Card</th>
                                    <th>Mô tả chi tiết</th>
                                    <th>Giá sản phẩm</th>
                                    <th>Số lượng còn</th>
                                    <th>Thuộc tính sản phẩm</th>
                                    <th>Thương hiệu</th>
                                    <th>Ảnh sản phẩm</th>
                                    {/* Add other table headers similarly */}
                                 </tr>
                              </thead>
                              <tbody className="table-body">
                                 {this.state.listProduct.map((product, index) => (
                                    <tr className="tr-item" key={index}>
                                       <td className="td-name">{product.nameProduct}</td>
                                       <td>{product.ramProduct}</td>
                                       <td>{product.cpuProduct}</td>
                                       <td>{product.screenProduct}</td>
                                       <td>{product.romProduct}</td>
                                       <td>{product.cardProduct}</td>
                                       <td className="td-desc">{product.descProduct}</td>
                                       <td>{product.priceProduct}</td>
                                       <td>{product.quantityProduct}</td>
                                       <td>
                                          {product.productAttributes ? (
                                             product.productAttributes.map((item, attrIndex) => (
                                                <span key={attrIndex}>{item.nameAttribute}</span>
                                             ))
                                          ) : (
                                             <span>No attributes</span>
                                          )}
                                       </td>
                                       <td>{product.brand.nameBrand}</td>
                                       <td>{this.showImagesInTable2(product.images)}</td>
                                    </tr>
                                 ))}
                              </tbody>
                           </table>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      );
   }
}

export default ImportPage;
