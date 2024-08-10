import axios from 'axios';

const baseURL = 'http://localhost:8080/api/v1/sale';
const token = localStorage.getItem('token');
class ApiSaleService {
   static async getAllSale() {
      const response = await axios.get(baseURL, {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      });
      return response.data.data;
   }

   static async createNewSale(data) {
      const response = await axios.post(baseURL, data, {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      });
      return response.data.data;
   }

   static async deleteSaleById(id) {
      const response = await axios.delete(`${baseURL}/${id}`, {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      });
      return response.data;
   }
}

export default ApiSaleService;
