import axios from 'axios';

const baseURL = 'http://localhost:8080/api/v1/auth';

class ApiAuthService {
   static async doSignIn(data) {
      const response = await axios.post(`${baseURL}/sign-in`, data);
      return response.data;
   }

   static async doSignUp(data) {
      const response = await axios.post(`${baseURL}/sign-up`, data);
      return response.data.data;
   }
}

export default ApiAuthService;
