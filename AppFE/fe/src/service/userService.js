import axios from 'axios';

const baseURL = 'http://localhost:8080/api/v1/customer';
const token = localStorage.getItem('token');
class ApiCustormerService {
   static async getCustomersById(idCustormer) {
      const response = await axios.get(`${baseURL}/${idCustormer}`, {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      });
      return response.data.data;
   }
}
export default ApiCustormerService;
