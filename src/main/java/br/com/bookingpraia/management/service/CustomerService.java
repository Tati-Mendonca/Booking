package br.com.bookingpraia.management.service;

import br.com.bookingpraia.management.dto.CustomerDto;
import br.com.bookingpraia.management.model.Customer;
import br.com.bookingpraia.management.repository.CustomerRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository repository;

    @Autowired
    private ModelMapper modelMapper;

    public CustomerDto create(CustomerDto customerDto){
        Customer customer = modelMapper.map(customerDto, Customer.class);
        Customer save = repository.save(customer);
        return modelMapper.map(save, CustomerDto.class);
    }

    public CustomerDto findById(Long id) {
        Customer customer = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Id não encontrado"));
        return modelMapper.map(customer, CustomerDto.class);
    }

    public List<CustomerDto> findByAll() {
        List<Customer> customers = repository.findAll();
        return customers.stream()
                .map(customer -> modelMapper.map(customer, CustomerDto.class))
                .collect(Collectors.toList());
    }

    public CustomerDto update(CustomerDto customer) {
        Customer existing = repository.findById(customer.getId())
                .orElseThrow(() -> new RuntimeException("Id não encontrado"));
        modelMapper.map(customer, existing);
        Customer updated = repository.save(existing);
        return modelMapper.map(updated, CustomerDto.class);

    }

    public void delete(Long id) {
        Customer customer = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));

        if (customer.getBookings() != null && !customer.getBookings().isEmpty()) {
            throw new RuntimeException("Não é possível deletar um cliente com reservas já cadastradas");
        }
        repository.deleteById(id);
    }

}
