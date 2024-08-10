import axios from 'axios';

const baseURL = 'http://localhost:8080/api/v1/product';
const token = localStorage.getItem('token');

class ApiProductService {
   static async getAllProduct() {
      const response = await axios.get(baseURL, {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      });
      return response.data.data;
   }

   static async getAProductByBrand(nameBrand) {
      const response = await axios.get(`${baseURL}/by-brand?nameBrand=${nameBrand}`, {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      });
      return response.data.data;
   }

   static async getProductById(id) {
      const response = await axios.get(`${baseURL}/${id}`, {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      });
      return response.data.data;
   }

   static async searchProduct(text) {
      const response = await axios.get(`${baseURL}/search?name-product=${text}`, {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      });
      return response.data.data;
   }
   static async getProducHaveSales() {
      const response = await axios.get(`${baseURL}/sale`, {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      });
      return response.data.data;
   }
}

export default ApiProductService;
