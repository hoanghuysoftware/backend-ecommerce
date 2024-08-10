import axios from 'axios';

const baseURL = 'http://localhost:8080/api/v1/receipt';
const token = localStorage.getItem('token');

class ApiReceiptService {
   static async createNewProduct(data) {
      const response = await axios.post(`${baseURL}/new`, data, {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      });
      return response.data.data;
   }
}

export default ApiReceiptService;
