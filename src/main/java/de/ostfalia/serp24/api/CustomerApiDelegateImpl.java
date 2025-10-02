package de.ostfalia.serp24.api;

import de.ostfalia.serp24.model.Customer;
import de.ostfalia.serp24.model.CustomerDTO;
import de.ostfalia.serp24.repository.CustomerRepository;
import de.ostfalia.serp24.service.CustomerService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.lang.reflect.Type;
import java.util.List;

@Component
public class CustomerApiDelegateImpl implements CustomersApiDelegate{

    private CustomerService customerService;
    private ModelMapper modelMapper;

    public CustomerApiDelegateImpl(CustomerService customerService, ModelMapper mapper, CustomerRepository customerRepository){
        this.customerService = customerService;
        this.modelMapper = mapper;
    }

    @Override
    public ResponseEntity<Void> deleteCustomer(Long id) {
        //Save using service
        customerService.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @Override
    public ResponseEntity<CustomerDTO> updateCustomer(Long id, CustomerDTO customerDTO) {
        //Convert DTO -> Entity
        Customer customer = modelMapper.map(customerDTO, Customer.class);
        //Save using service
        customer = customerService.updateById(id, customer);
        //Convert Entity -> DTO (so you don’t expose entity directly in API)
        return ResponseEntity.ok(modelMapper.map(customer, CustomerDTO.class));
    }


    public ResponseEntity<List<CustomerDTO>> getCustomers(){
        List<Customer> customers = customerService.findAll();
        Type listType = new TypeToken<List<CustomerDTO>>() {}.getType();

        return ResponseEntity.ok(modelMapper.map(customers, listType));
    }

    @Override
    public ResponseEntity<CustomerDTO> getCustomerById(Long id) {
        Customer customer = customerService.findById(id);

        return ResponseEntity.ok(modelMapper.map(customer, CustomerDTO.class));
    }

    @Override
    public ResponseEntity<CustomerDTO> createCustomer(CustomerDTO customerDTO) {
        //Convert DTO -> Entity
        Customer customer = modelMapper.map(customerDTO, Customer.class);
        //Save using service
        customer = customerService.save(customer);
        //Convert Entity -> DTO (so you don’t expose entity directly in API)
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(modelMapper.map(customer, CustomerDTO.class));
    }
}
