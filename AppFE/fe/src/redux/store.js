// store.js
import { createStore } from 'redux';
import rootReducer from './reducers'; // Import rootReducer của bạn ở đây

const store = createStore(rootReducer);

export default store; // Xuất biến store
