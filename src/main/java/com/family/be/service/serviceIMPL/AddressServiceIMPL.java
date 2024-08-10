package com.family.be.service.serviceIMPL;

import com.family.be.dto.request.AddressRequest;
import com.family.be.models.Address;
import com.family.be.models.Customer;
import com.family.be.repository.AddressRepository;
import com.family.be.repository.CustomerRepository;
import com.family.be.service.AddressService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AddressServiceIMPL implements AddressService {
    private final AddressRepository addressRepository;
    private final CustomerRepository customerRepository;

    @Override
    public Address addNewAddress(AddressRequest addressRequest) {
        Customer customer = customerRepository.findCustomerById(addressRequest.getIdUser());
        Address newAddress = Address.builder()
                .customer(customer)
                .dataAddress(addressRequest.getNameAddress())
                .build();
        return addressRepository.save(newAddress);
    }

    @Override
    @Transactional
    public void deleteAddress(Long id) {
        Address address = addressRepository.findAddressById(id);
        if (address != null) {
            addressRepository.delete(address);
        }
    }

    @Override
    public Address updateAddress(AddressRequest addressRequest, Long idAddress) {
        Address address = addressRepository.findAddressById(idAddress);
        address.setDataAddress(addressRequest.getNameAddress());
        return addressRepository.save(address);
    }
}
