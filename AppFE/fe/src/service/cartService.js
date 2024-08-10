import axios from 'axios';

const baseURL = 'http://localhost:8080/api/v1/';
const token = localStorage.getItem('token');
class ApiCartService {
   static async addProductToCart(idUser, data) {
      const response = await axios.post(`${baseURL}cart/${idUser}`, data, {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      });
      return response.data.data;
   }

   static async removeProductFromCart(idUser, idProduct) {
      const response = await axios.delete(`${baseURL}cart/${idUser}/${idProduct}`, {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      });
      return response.data.data;
   }

   static async updateQuantityOfProduct(idUser, idProduct, quantity) {
      const response = await axios.patch(
         `${baseURL}cart/update/user/${idUser}/product/${idProduct}/quantity/${quantity}`,
         {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         },
      );
      return response.data.data;
   }
}

export default ApiCartService;
