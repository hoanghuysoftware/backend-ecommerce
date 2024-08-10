import axios from 'axios';

const baseURL = 'http://localhost:8080/api/v1/product-attribute';
const token = localStorage.getItem('token');
class ApiProductAttribute {
   static async getAllAttribute() {
      const response = await axios.get(baseURL, {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      });
      return response.data.data;
   }
}

export default ApiProductAttribute;
