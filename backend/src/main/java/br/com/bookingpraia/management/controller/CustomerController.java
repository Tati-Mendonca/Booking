package br.com.bookingpraia.management.controller;

import br.com.bookingpraia.management.dto.CustomerDto;
import br.com.bookingpraia.management.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("api/customer/v1")
public class CustomerController {

    @Autowired
    private CustomerService service;

    @PostMapping
    public CustomerDto create(@RequestBody CustomerDto customer) {
        return service.create(customer);
    }

    @GetMapping("/{id}")
    public CustomerDto findById(@PathVariable Long id){
        return service.findById(id);
    }

    @GetMapping("/search")
    public List<CustomerDto> findByName(@RequestParam String name) {
        return service.findByName(name);
    }

    @GetMapping
    public List<CustomerDto> findByAll() {
        return service.findByAll();
    }

    @PutMapping
    public CustomerDto update(@RequestBody CustomerDto customer){
        return service.update(customer);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id){
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
