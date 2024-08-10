import axios from 'axios';

const baseURL = 'http://localhost:8080/api/v1/importer';
const token = localStorage.getItem('token');
class APiImportService {
   static async getAllImport() {
      const response = await axios.get(baseURL, {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      });
      return response.data.data;
   }
}

export default APiImportService;
