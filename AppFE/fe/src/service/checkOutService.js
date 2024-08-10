import axios from 'axios';
const baseUrl = 'http://localhost:8080/pay/vn-pay/';
const baseUrlOrder = 'http://localhost:8080/api/v1/order';
const token = localStorage.getItem('token');

class ApiCheckOutService {
   static async handleRequestPayment(idDonHang, amount) {
      const response = await axios.get(`${baseUrl}${idDonHang}/${amount}`, {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      });
      return response.data;
   }
   static async getOrderById(idDonHang) {
      const response = await axios.get(`${baseUrlOrder}/${idDonHang}`, {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      });
      return response.data.data;
   }
   static async getOrderByIdCustomer(idCustomer) {
      const response = await axios.get(`${baseUrlOrder}/customer/${idCustomer}`, {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      });
      return response.data.data;
   }
   static async createNewOrder(data) {
      const response = await axios.post(baseUrlOrder, data, {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      });
      return response.data.data;
   }
   static async updateOrderStatusPay(idDonHang, payStatus) {
      const response = await axios.patch(`${baseUrlOrder}/payment/${idDonHang}?orderStatusPay=${payStatus}`, {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      });
      return response.data.data;
   }
   static async updateOrderStatus(idDonHang, orderStatus) {
      const response = await axios.patch(`${baseUrlOrder}/order/${idDonHang}?orderStatus=${orderStatus}`, {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      });
      return response.data.data;
   }
}

export default ApiCheckOutService;
