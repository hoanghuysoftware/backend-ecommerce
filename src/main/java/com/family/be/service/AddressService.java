package com.family.be.service;

import com.family.be.dto.request.AddressRequest;
import com.family.be.models.Address;

public interface AddressService {
    Address addNewAddress(AddressRequest addressRequest);
    void deleteAddress(Long id);
    Address updateAddress(AddressRequest addressRequest, Long idAddress);
}
