export const setProduct = (products) => ({
   type: 'SET_PRODUCT',
   payload: products,
});

export const addNumberInCart = (number) => ({
   type: 'ADD_NUMBER_IN_CART',
   payload: number,
});

export const setNumberInCart = (number) => ({
   type: 'SET_NUMBER_IN_CART',
   payload: number,
});

export const removeNumberInCart = (number) => ({
   type: 'REMOVE_NUMBER_IN_CART',
   payload: number,
});
