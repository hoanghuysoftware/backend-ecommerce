import axios from 'axios';
const baseUrl = 'http://localhost:8080/api/v1/';
const token = localStorage.getItem('token');

class ApiAddressService {
   static async addNewAddress(data) {
      const response = await axios.post(`${baseUrl}address/user/add`, data, {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      });
      return response.data.data;
   }
   static async deleteAddress(id) {
      const response = await axios.delete(`${baseUrl}address/${id}`, {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      });
      return response.data.data;
   }
   static async updateAddress(id, data) {
      const response = await axios.put(`${baseUrl}address/${id}`, data, {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      });
      return response.data.data;
   }
}

export default ApiAddressService;
