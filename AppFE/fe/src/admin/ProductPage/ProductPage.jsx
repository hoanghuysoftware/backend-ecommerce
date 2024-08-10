import React, { Component } from 'react';
import './product-page.css';
import ApiProductService from '../../service/productService';

class ProductPage extends Component {
   constructor(props) {
      super(props);
      this.state = {
         test: [],
      };
   }

   async componentDidMount() {
      const data = await ApiProductService.getAllProduct();
      const newData = data.slice(2);
      this.setState({ test: newData });
   }

   render() {
      const { test } = this.state;
      const imgProductTest = '/lenovo1.jpg';
      return (
         <div className="product-page">
            <div className="product-title">
               <h2>Sản phẩm</h2>
            </div>
            <div className="product-option">
               <button type="button" className="btn btn-info">
                  Chi tiết
               </button>
               <button type="button" className="btn btn-warning">
                  Cập nhật
               </button>
               <button type="button" className="btn btn-danger">
                  Xóa
               </button>
            </div>
            <div className="product-table">
               <table className="table table-hover">
                  <thead className="table-title">
                     <tr className="table-primary table-title-fix">
                        <th scope="col">ID</th>
                        <th scope="col">Hình ảnh</th>
                        <th scope="col">Tên sản phẩm</th>
                        <th scope="col">CPU</th>
                        <th scope="col">RAM</th>
                        <th scope="col">Card</th>
                        <th scope="col">Dung lượng</th>
                        <th scope="col">M.Hình</th>
                        <th scope="col">Mô tả</th>
                        <th scope="col">S.Lượng</th>
                        <th scope="col">Giá</th>
                     </tr>
                     <tr className="table-primary">
                        <th scope="col">ID</th>
                        <th scope="col">Hình ảnh</th>
                        <th scope="col">Tên sản phẩm</th>
                        <th scope="col">CPU</th>
                        <th scope="col">RAM</th>
                        <th scope="col">Card</th>
                        <th scope="col">Dung lượng</th>
                        <th scope="col">M.Hình</th>
                        <th scope="col">Mô tả</th>
                        <th scope="col">S.Lượng</th>
                        <th scope="col">Giá</th>
                     </tr>
                  </thead>
                  <tbody className="table-body">
                     {test.map((item) => (
                        <tr key={item.id} className="tr-item">
                           <th scope="row">{item.id}</th>
                           <td>
                              <div className="td-img" style={{ backgroundImage: `url(data:image/jpeg;base64,${item.images[0].imageData})` }}></div>
                           </td>
                           <td className="td-name">{item.nameProduct}</td>
                           <td>{item.cpuProduct}</td>
                           <td>{item.ramProduct}</td>
                           <td>{item.cardProduct}</td>
                           <td>{item.romProduct}</td>
                           <td>{item.screenProduct}</td>
                           <td className="td-desc">{item.descProduct}</td>
                           <td>{item.quantityProduct}</td>
                           <td>{item.priceProduct.toLocaleString()}</td>
                        </tr>
                     ))}
                     <tr className="tr-item">
                        <th scope="row">1</th>
                        <td>
                           <div className="td-img" style={{ backgroundImage: `url(${imgProductTest})` }}></div>
                        </td>
                        <td className="td-name">
                           [New 100%] Laptop Lenovo LOQ 15IAX9 83GS000FVN - Intel Core i5-12450HX | RTX 2050 4GB | 15.6
                           inch Full HD 144Hz 100% sRGB
                        </td>
                        <td>i5 - 1240P</td>
                        <td>16GB DDR4</td>
                        <td>Intel Iris Xe Graphics</td>
                        <td>SSD 512GB NVMe</td>
                        <td>14" 2.2K</td>
                        <td className="td-desc">
                           Lenovo Ideapad L340 thiết kế đơn giản, gọn nhẹ Máy tính Lenovo Ideapad L340 sở hữu thiết kế
                           đơn giản với lớp vỏ màu đen vô cùng lịch lãm. Phần vỏ máy được nhấn nhá họa tiết phay xước
                           giả nhôm giúp chiếc máy thêm phần sang trọng, phù hợp với nhiều đối tượng người dùng và môi
                           trường làm việc. Với chất liệu được làm từ nhựa cao cấp và phần khung máy được gia cố chắc
                           chắn, máy sẽ hạn chế được các lực tác động lên bo mạch chủ khi có xảy ra rơi rớt và đồng thời
                           hạn chế được các trầy xước trên mặt lưng. Mặc dù sở hữu màn hình kích thước lớn nhưng trọng
                           lượng của chiếc máy tính Lenovo Ideapad L340 lại khá nhẹ nhàng so với những chiếc máy tính
                           chơi game khác. Với trọng lượng ~ 2.4kg, bạn vẫn có thể mang máy bỏ trong balo và di chuyển
                           một cách dễ dàng. Lenovo Ideapad L340 hiệu năng mạnh mẽ vượt giá thành Mặc dù Lenovo Ideapad
                           L340 là chiếc máy tính gaming có giá rẻ nhất, nhưng lại được trang bị chip Intel Core i7
                           9750H cho hiệu năng vô cùng mạnh mẽ. Không chỉ xử lý nhanh mượt các thao tác cơ bản trên ứng
                           dụng Office mà chiếc laptop Lenovo này còn hỗ trợ thiết kế tốt với phần mềm Photoshop, AI.
                           Kết hợp với card đồ họa rời NVIDIA GTX 1050 3GB, người dùng hoàn toàn có thể chơi được hầu
                           hết các tựa game online hiện nay. Các tựa game như LOL và CSGO cho cấu hình đạt max setting.
                           Ngoài ra, RAM 8GB cho phép người dùng làm việc đa nhiệm không giật, lag. Bạn có thể nâng cấp
                           dung lượng RAM để xử lý được nhiều công việc cùng lúc hơn. Ổ cứng SSD 512GB NVMe đưa tới
                           không gian lưu trữ rộng, khả năng xử lý dữ liệu, khởi động máy và các ứng dụng game cực kì
                           nhanh chóng.
                        </td>
                        <td>100</td>
                        <td>17.990.000</td>
                     </tr>
                     <tr className="tr-item">
                        <th scope="row">1</th>
                        <td>
                           <div className="td-img" style={{ backgroundImage: `url(${imgProductTest})` }}></div>
                        </td>
                        <td className="td-name">
                           [New 100%] Laptop Lenovo LOQ 15IAX9 83GS000FVN - Intel Core i5-12450HX | RTX 2050 4GB | 15.6
                           inch Full HD 144Hz 100% sRGB
                        </td>
                        <td>i5 - 1240P</td>
                        <td>16GB DDR4</td>
                        <td>Intel Iris Xe Graphics</td>
                        <td>SSD 512GB NVMe</td>
                        <td>14" 2.2K</td>
                        <td className="td-desc">
                           Lenovo Ideapad L340 thiết kế đơn giản, gọn nhẹ Máy tính Lenovo Ideapad L340 sở hữu thiết kế
                           đơn giản với lớp vỏ màu đen vô cùng lịch lãm. Phần vỏ máy được nhấn nhá họa tiết phay xước
                           giả nhôm giúp chiếc máy thêm phần sang trọng, phù hợp với nhiều đối tượng người dùng và môi
                           trường làm việc. Với chất liệu được làm từ nhựa cao cấp và phần khung máy được gia cố chắc
                           chắn, máy sẽ hạn chế được các lực tác động lên bo mạch chủ khi có xảy ra rơi rớt và đồng thời
                           hạn chế được các trầy xước trên mặt lưng. Mặc dù sở hữu màn hình kích thước lớn nhưng trọng
                           lượng của chiếc máy tính Lenovo Ideapad L340 lại khá nhẹ nhàng so với những chiếc máy tính
                           chơi game khác. Với trọng lượng ~ 2.4kg, bạn vẫn có thể mang máy bỏ trong balo và di chuyển
                           một cách dễ dàng. Lenovo Ideapad L340 hiệu năng mạnh mẽ vượt giá thành Mặc dù Lenovo Ideapad
                           L340 là chiếc máy tính gaming có giá rẻ nhất, nhưng lại được trang bị chip Intel Core i7
                           9750H cho hiệu năng vô cùng mạnh mẽ. Không chỉ xử lý nhanh mượt các thao tác cơ bản trên ứng
                           dụng Office mà chiếc laptop Lenovo này còn hỗ trợ thiết kế tốt với phần mềm Photoshop, AI.
                           Kết hợp với card đồ họa rời NVIDIA GTX 1050 3GB, người dùng hoàn toàn có thể chơi được hầu
                           hết các tựa game online hiện nay. Các tựa game như LOL và CSGO cho cấu hình đạt max setting.
                           Ngoài ra, RAM 8GB cho phép người dùng làm việc đa nhiệm không giật, lag. Bạn có thể nâng cấp
                           dung lượng RAM để xử lý được nhiều công việc cùng lúc hơn. Ổ cứng SSD 512GB NVMe đưa tới
                           không gian lưu trữ rộng, khả năng xử lý dữ liệu, khởi động máy và các ứng dụng game cực kì
                           nhanh chóng.
                        </td>
                        <td>100</td>
                        <td>17.990.000</td>
                     </tr>
                     <tr className="tr-item">
                        <th scope="row">1</th>
                        <td>
                           <div className="td-img" style={{ backgroundImage: `url(${imgProductTest})` }}></div>
                        </td>
                        <td className="td-name">
                           [New 100%] Laptop Lenovo LOQ 15IAX9 83GS000FVN - Intel Core i5-12450HX | RTX 2050 4GB | 15.6
                           inch Full HD 144Hz 100% sRGB
                        </td>
                        <td>i5 - 1240P</td>
                        <td>16GB DDR4</td>
                        <td>Intel Iris Xe Graphics</td>
                        <td>SSD 512GB NVMe</td>
                        <td>14" 2.2K</td>
                        <td className="td-desc">
                           Lenovo Ideapad L340 thiết kế đơn giản, gọn nhẹ Máy tính Lenovo Ideapad L340 sở hữu thiết kế
                           đơn giản với lớp vỏ màu đen vô cùng lịch lãm. Phần vỏ máy được nhấn nhá họa tiết phay xước
                           giả nhôm giúp chiếc máy thêm phần sang trọng, phù hợp với nhiều đối tượng người dùng và môi
                           trường làm việc. Với chất liệu được làm từ nhựa cao cấp và phần khung máy được gia cố chắc
                           chắn, máy sẽ hạn chế được các lực tác động lên bo mạch chủ khi có xảy ra rơi rớt và đồng thời
                           hạn chế được các trầy xước trên mặt lưng. Mặc dù sở hữu màn hình kích thước lớn nhưng trọng
                           lượng của chiếc máy tính Lenovo Ideapad L340 lại khá nhẹ nhàng so với những chiếc máy tính
                           chơi game khác. Với trọng lượng ~ 2.4kg, bạn vẫn có thể mang máy bỏ trong balo và di chuyển
                           một cách dễ dàng. Lenovo Ideapad L340 hiệu năng mạnh mẽ vượt giá thành Mặc dù Lenovo Ideapad
                           L340 là chiếc máy tính gaming có giá rẻ nhất, nhưng lại được trang bị chip Intel Core i7
                           9750H cho hiệu năng vô cùng mạnh mẽ. Không chỉ xử lý nhanh mượt các thao tác cơ bản trên ứng
                           dụng Office mà chiếc laptop Lenovo này còn hỗ trợ thiết kế tốt với phần mềm Photoshop, AI.
                           Kết hợp với card đồ họa rời NVIDIA GTX 1050 3GB, người dùng hoàn toàn có thể chơi được hầu
                           hết các tựa game online hiện nay. Các tựa game như LOL và CSGO cho cấu hình đạt max setting.
                           Ngoài ra, RAM 8GB cho phép người dùng làm việc đa nhiệm không giật, lag. Bạn có thể nâng cấp
                           dung lượng RAM để xử lý được nhiều công việc cùng lúc hơn. Ổ cứng SSD 512GB NVMe đưa tới
                           không gian lưu trữ rộng, khả năng xử lý dữ liệu, khởi động máy và các ứng dụng game cực kì
                           nhanh chóng.
                        </td>
                        <td>100</td>
                        <td>17.990.000</td>
                     </tr>
                     <tr className="tr-item">
                        <th scope="row">1</th>
                        <td>
                           <div className="td-img" style={{ backgroundImage: `url(${imgProductTest})` }}></div>
                        </td>
                        <td className="td-name">
                           [New 100%] Laptop Lenovo LOQ 15IAX9 83GS000FVN - Intel Core i5-12450HX | RTX 2050 4GB | 15.6
                           inch Full HD 144Hz 100% sRGB
                        </td>
                        <td>i5 - 1240P</td>
                        <td>16GB DDR4</td>
                        <td>Intel Iris Xe Graphics</td>
                        <td>SSD 512GB NVMe</td>
                        <td>14" 2.2K</td>
                        <td className="td-desc">
                           Lenovo Ideapad L340 thiết kế đơn giản, gọn nhẹ Máy tính Lenovo Ideapad L340 sở hữu thiết kế
                           đơn giản với lớp vỏ màu đen vô cùng lịch lãm. Phần vỏ máy được nhấn nhá họa tiết phay xước
                           giả nhôm giúp chiếc máy thêm phần sang trọng, phù hợp với nhiều đối tượng người dùng và môi
                           trường làm việc. Với chất liệu được làm từ nhựa cao cấp và phần khung máy được gia cố chắc
                           chắn, máy sẽ hạn chế được các lực tác động lên bo mạch chủ khi có xảy ra rơi rớt và đồng thời
                           hạn chế được các trầy xước trên mặt lưng. Mặc dù sở hữu màn hình kích thước lớn nhưng trọng
                           lượng của chiếc máy tính Lenovo Ideapad L340 lại khá nhẹ nhàng so với những chiếc máy tính
                           chơi game khác. Với trọng lượng ~ 2.4kg, bạn vẫn có thể mang máy bỏ trong balo và di chuyển
                           một cách dễ dàng. Lenovo Ideapad L340 hiệu năng mạnh mẽ vượt giá thành Mặc dù Lenovo Ideapad
                           L340 là chiếc máy tính gaming có giá rẻ nhất, nhưng lại được trang bị chip Intel Core i7
                           9750H cho hiệu năng vô cùng mạnh mẽ. Không chỉ xử lý nhanh mượt các thao tác cơ bản trên ứng
                           dụng Office mà chiếc laptop Lenovo này còn hỗ trợ thiết kế tốt với phần mềm Photoshop, AI.
                           Kết hợp với card đồ họa rời NVIDIA GTX 1050 3GB, người dùng hoàn toàn có thể chơi được hầu
                           hết các tựa game online hiện nay. Các tựa game như LOL và CSGO cho cấu hình đạt max setting.
                           Ngoài ra, RAM 8GB cho phép người dùng làm việc đa nhiệm không giật, lag. Bạn có thể nâng cấp
                           dung lượng RAM để xử lý được nhiều công việc cùng lúc hơn. Ổ cứng SSD 512GB NVMe đưa tới
                           không gian lưu trữ rộng, khả năng xử lý dữ liệu, khởi động máy và các ứng dụng game cực kì
                           nhanh chóng.
                        </td>
                        <td>100</td>
                        <td>17.990.000</td>
                     </tr>
                     <tr className="tr-item">
                        <th scope="row">1</th>
                        <td>
                           <div className="td-img" style={{ backgroundImage: `url(${imgProductTest})` }}></div>
                        </td>
                        <td className="td-name">
                           [New 100%] Laptop Lenovo LOQ 15IAX9 83GS000FVN - Intel Core i5-12450HX | RTX 2050 4GB | 15.6
                           inch Full HD 144Hz 100% sRGB
                        </td>
                        <td>i5 - 1240P</td>
                        <td>16GB DDR4</td>
                        <td>Intel Iris Xe Graphics</td>
                        <td>SSD 512GB NVMe</td>
                        <td>14" 2.2K</td>
                        <td className="td-desc">
                           Lenovo Ideapad L340 thiết kế đơn giản, gọn nhẹ Máy tính Lenovo Ideapad L340 sở hữu thiết kế
                           đơn giản với lớp vỏ màu đen vô cùng lịch lãm. Phần vỏ máy được nhấn nhá họa tiết phay xước
                           giả nhôm giúp chiếc máy thêm phần sang trọng, phù hợp với nhiều đối tượng người dùng và môi
                           trường làm việc. Với chất liệu được làm từ nhựa cao cấp và phần khung máy được gia cố chắc
                           chắn, máy sẽ hạn chế được các lực tác động lên bo mạch chủ khi có xảy ra rơi rớt và đồng thời
                           hạn chế được các trầy xước trên mặt lưng. Mặc dù sở hữu màn hình kích thước lớn nhưng trọng
                           lượng của chiếc máy tính Lenovo Ideapad L340 lại khá nhẹ nhàng so với những chiếc máy tính
                           chơi game khác. Với trọng lượng ~ 2.4kg, bạn vẫn có thể mang máy bỏ trong balo và di chuyển
                           một cách dễ dàng. Lenovo Ideapad L340 hiệu năng mạnh mẽ vượt giá thành Mặc dù Lenovo Ideapad
                           L340 là chiếc máy tính gaming có giá rẻ nhất, nhưng lại được trang bị chip Intel Core i7
                           9750H cho hiệu năng vô cùng mạnh mẽ. Không chỉ xử lý nhanh mượt các thao tác cơ bản trên ứng
                           dụng Office mà chiếc laptop Lenovo này còn hỗ trợ thiết kế tốt với phần mềm Photoshop, AI.
                           Kết hợp với card đồ họa rời NVIDIA GTX 1050 3GB, người dùng hoàn toàn có thể chơi được hầu
                           hết các tựa game online hiện nay. Các tựa game như LOL và CSGO cho cấu hình đạt max setting.
                           Ngoài ra, RAM 8GB cho phép người dùng làm việc đa nhiệm không giật, lag. Bạn có thể nâng cấp
                           dung lượng RAM để xử lý được nhiều công việc cùng lúc hơn. Ổ cứng SSD 512GB NVMe đưa tới
                           không gian lưu trữ rộng, khả năng xử lý dữ liệu, khởi động máy và các ứng dụng game cực kì
                           nhanh chóng.
                        </td>
                        <td>100</td>
                        <td>17.990.000</td>
                     </tr>
                     <tr className="tr-item">
                        <th scope="row">1</th>
                        <td>
                           <div className="td-img" style={{ backgroundImage: `url(${imgProductTest})` }}></div>
                        </td>
                        <td className="td-name">
                           [New 100%] Laptop Lenovo LOQ 15IAX9 83GS000FVN - Intel Core i5-12450HX | RTX 2050 4GB | 15.6
                           inch Full HD 144Hz 100% sRGB
                        </td>
                        <td>i5 - 1240P</td>
                        <td>16GB DDR4</td>
                        <td>Intel Iris Xe Graphics</td>
                        <td>SSD 512GB NVMe</td>
                        <td>14" 2.2K</td>
                        <td className="td-desc">
                           Lenovo Ideapad L340 thiết kế đơn giản, gọn nhẹ Máy tính Lenovo Ideapad L340 sở hữu thiết kế
                           đơn giản với lớp vỏ màu đen vô cùng lịch lãm. Phần vỏ máy được nhấn nhá họa tiết phay xước
                           giả nhôm giúp chiếc máy thêm phần sang trọng, phù hợp với nhiều đối tượng người dùng và môi
                           trường làm việc. Với chất liệu được làm từ nhựa cao cấp và phần khung máy được gia cố chắc
                           chắn, máy sẽ hạn chế được các lực tác động lên bo mạch chủ khi có xảy ra rơi rớt và đồng thời
                           hạn chế được các trầy xước trên mặt lưng. Mặc dù sở hữu màn hình kích thước lớn nhưng trọng
                           lượng của chiếc máy tính Lenovo Ideapad L340 lại khá nhẹ nhàng so với những chiếc máy tính
                           chơi game khác. Với trọng lượng ~ 2.4kg, bạn vẫn có thể mang máy bỏ trong balo và di chuyển
                           một cách dễ dàng. Lenovo Ideapad L340 hiệu năng mạnh mẽ vượt giá thành Mặc dù Lenovo Ideapad
                           L340 là chiếc máy tính gaming có giá rẻ nhất, nhưng lại được trang bị chip Intel Core i7
                           9750H cho hiệu năng vô cùng mạnh mẽ. Không chỉ xử lý nhanh mượt các thao tác cơ bản trên ứng
                           dụng Office mà chiếc laptop Lenovo này còn hỗ trợ thiết kế tốt với phần mềm Photoshop, AI.
                           Kết hợp với card đồ họa rời NVIDIA GTX 1050 3GB, người dùng hoàn toàn có thể chơi được hầu
                           hết các tựa game online hiện nay. Các tựa game như LOL và CSGO cho cấu hình đạt max setting.
                           Ngoài ra, RAM 8GB cho phép người dùng làm việc đa nhiệm không giật, lag. Bạn có thể nâng cấp
                           dung lượng RAM để xử lý được nhiều công việc cùng lúc hơn. Ổ cứng SSD 512GB NVMe đưa tới
                           không gian lưu trữ rộng, khả năng xử lý dữ liệu, khởi động máy và các ứng dụng game cực kì
                           nhanh chóng.
                        </td>
                        <td>100</td>
                        <td>17.990.000</td>
                     </tr>
                  </tbody>
               </table>
            </div>
         </div>
      );
   }
}

export default ProductPage;
