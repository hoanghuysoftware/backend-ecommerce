import axios from 'axios';

const baseURL = 'http://localhost:8080/api/v1/brand';
const token = localStorage.getItem('token');

class ApiBrandService {
   static async getAllBrand() {
      const response = await axios.get(baseURL, {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      });
      return response.data.data;
   }

   static async getABrandByID(id) {
      const response = await axios.get(`${baseURL}/${id}`, {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      });
      return response.data.data;
   }

   static async createNewBrand(data) {
      const response = await axios.post(baseURL, data, {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      });
      return response.data.data;
   }
}

export default ApiBrandService;
