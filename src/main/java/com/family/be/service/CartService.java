package com.family.be.service;

import com.family.be.dto.request.CartRequest;
import com.family.be.models.Cart;

import java.util.List;

public interface CartService {
    Cart addProductIntoCart(CartRequest cartRequest, Long idCustomer);
    Cart deleteProductInCart(Long idProduct, Long idCustomer);

    Cart updateQuantityInCart(Long idCustomer, Long idProduct, Long quantityUpdate);
}
