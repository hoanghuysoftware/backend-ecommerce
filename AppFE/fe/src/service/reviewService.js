import axios from 'axios';
const baseURL = 'http://localhost:8080/api/v1/reviews';
const token = localStorage.getItem('token');

class ApiReviewService {
   static async getAllReview(id) {
      const response = await axios.get(`${baseURL}?id=${id}`, {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      });
      return response.data.data;
   }

   static async checkExistsReviewOfOrder(idOder) {
      const response = await axios.get(`http://localhost:8080/api/v1/reviews/check/${idOder}`, {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      });
      return response.data.data;
   }

   static async createNewReview(data) {
      const response = await axios.post(baseURL, data, {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      });
      return response.data.data;
   }
}

export default ApiReviewService;
