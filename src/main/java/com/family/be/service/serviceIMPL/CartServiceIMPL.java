package com.family.be.service.serviceIMPL;

import com.family.be.dto.request.CartRequest;
import com.family.be.models.Cart;
import com.family.be.models.Customer;
import com.family.be.models.DetailsCart;
import com.family.be.models.Product;
import com.family.be.repository.CartRepository;
import com.family.be.repository.CustomerRepository;
import com.family.be.repository.DetailsCartRepository;
import com.family.be.repository.ProductRepository;
import com.family.be.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CartServiceIMPL implements CartService {
    private final CartRepository cartRepository;
    private final CustomerRepository customerRepository;
    private final ProductRepository productRepository;
    private final DetailsCartRepository detailsCartRepository;

    @Override
    public Cart addProductIntoCart(CartRequest cartRequest, Long idCustomer) {
        Customer customer = customerRepository.findCustomerById(idCustomer);
        Product product = productRepository.getProductById(cartRequest.getIdProduct()).orElseThrow(() ->
                new RuntimeException("Not found product in CartServiceIMPL function addProductIntoCart !"));
        Cart cart = customer.getCart();
        List<DetailsCart> detailsCartList = cart.getDetailsCarts();

        boolean productExistsInCart = false;
        for (DetailsCart item : detailsCartList) {
            if (item.getProduct().getId().equals(cartRequest.getIdProduct())) {
                int newQuantity = item.getQuantityDetailCart() + cartRequest.getQuantity();
                item.setQuantityDetailCart(newQuantity);
                productExistsInCart = true;
                break;
            }
        }
        if (!productExistsInCart) {
            DetailsCart detailsCart = DetailsCart.builder()
                    .cart(cart)
                    .product(product)
                    .quantityDetailCart(cartRequest.getQuantity())
                    .priceDetailCart(product.getPriceProduct())
                    .build();
            detailsCartList.add(detailsCart);
        }

        cart.setQuantityCart(cart.getQuantityCart() + cartRequest.getQuantity());
        cart.setPriceCart(cart.getPriceCart() + (cartRequest.getQuantity() * product.getPriceProduct()));
        cart.setDetailsCarts(detailsCartList);

        return cartRepository.save(cart);
    }

    @Override
    public Cart deleteProductInCart(Long idProduct, Long idCustomer) {
        Customer customer = customerRepository.findCustomerById(idCustomer);
        Cart cart = customer.getCart();
        List<DetailsCart> detailsCartList = cart.getDetailsCarts();

        int quantityRemove = 0;
        Long priceRemove = 0L;
        for (DetailsCart item : detailsCartList){
            if (item.getProduct().getId().equals(idProduct)){
                detailsCartList.remove(item);
                quantityRemove = item.getQuantityDetailCart();
                priceRemove = item.getPriceDetailCart();
//                item.getProduct().setQuantityProduct(item.getProduct().getQuantityProduct() + quantityRemove);
                detailsCartRepository.delete(item);
                break;
            }
        }
        cart.setQuantityCart(cart.getQuantityCart() - quantityRemove);
        cart.setPriceCart(cart.getPriceCart() - (quantityRemove * priceRemove));
        cart.setDetailsCarts(detailsCartList);

        return cartRepository.save(cart);
    }

    @Override
    @Transactional
    public Cart updateQuantityInCart(Long idCustomer, Long idProduct, Long quantityUpdate) {
        Customer customer = customerRepository.findCustomerById(idCustomer);
        Cart cart  = customer.getCart();
        List<DetailsCart> detailsCartList = cart.getDetailsCarts();
        long totalPrice = 0L;
        int totalQuantity = 0;
        for (DetailsCart item : detailsCartList){
            if(item.getProduct().getId().equals(idProduct)){
                item.setQuantityDetailCart(Math.toIntExact(quantityUpdate));
                totalPrice += item.getPriceDetailCart() * item.getQuantityDetailCart();
                totalQuantity += item.getQuantityDetailCart();
            }else {
                totalPrice += item.getPriceDetailCart() * item.getQuantityDetailCart();
                totalQuantity += item.getQuantityDetailCart();
            }
        }
        cart.setPriceCart(totalPrice);
        cart.setQuantityCart(totalQuantity);
        cart.setDetailsCarts(detailsCartList);
        return cartRepository.save(cart);
    }
}
