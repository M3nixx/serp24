package de.ostfalia.serp24.service;

import de.ostfalia.serp24.Exceptions.NotFoundException;
import de.ostfalia.serp24.model.Customer;
import de.ostfalia.serp24.model.Error;
import de.ostfalia.serp24.repository.CustomerRepository;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CustomerService {
    private final CustomerRepository customerRepository;
    private ModelMapper modelMapper;

    // Constructor injection (recommended)
    public CustomerService(CustomerRepository customerRepository, ModelMapper modelMapper) {
        this.customerRepository = customerRepository;
        this.modelMapper = modelMapper;
    }

    // Find customer by ID
    public Customer findById(Long id) {
        return customerRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Customer not found with id: " + id));
    }

    // Create or update a customer
    public Customer save(Customer customer) {
        return customerRepository.save(customer);
    }

    // Get all customers
    public List<Customer> findAll() {
        return customerRepository.findAll();
    }

    // Delete customer
    public void deleteById(Long id) {
        if (!customerRepository.existsById(id)) {
            throw new NotFoundException("Customer not found with id: " + id);
        }
        customerRepository.deleteById(id);
    }

    public Customer updateById(Long id, Customer customer) {
        if (!customerRepository.existsById(id)) {
            throw new NotFoundException("Customer not found with id: " + id);
        }else {
            Customer customerToUpdate = findById(id);
            modelMapper.map(customer, customerToUpdate);

            return save(customerToUpdate);
        }
    }
}
