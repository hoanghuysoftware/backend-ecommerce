const intitReducer = {
   products: [],
   quantity_cards: 0,
};

const rootReducer = (state = intitReducer, action) => {
   switch (action.type) {
      case 'SET_PRODUCT':
         return { ...state, products: action.payload };
      case 'SET_NUMBER_IN_CART':
         return { ...state, quantity_cards: action.payload };
      case 'ADD_NUMBER_IN_CART':
         return { ...state, quantity_cards: state.quantity_cards + action.payload };
      case 'REMOVE_NUMBER_IN_CART':
         return { ...state, quantity_cards: state.quantity_cards - action.payload };
      default:
         return state;
   }
};

export default rootReducer;
