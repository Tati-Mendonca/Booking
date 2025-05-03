package br.com.bookingpraia.management.controller;

import br.com.bookingpraia.management.dto.BookingDto;
import br.com.bookingpraia.management.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/booking/v1")
public class BookingController {

    @Autowired
    private BookingService service;

    @PostMapping
    public BookingDto create(@RequestBody BookingDto booking){
        return service.create(booking);
    }

    @GetMapping("/{id}")
    public BookingDto findById(@PathVariable Long id){
        return service.findById(id);
    }

    @GetMapping("/customer/{customerId}")
    public List<BookingDto> findByCustomerId(@PathVariable Long customerId) {
        return service.findByCustomerId(customerId);
    }

    @GetMapping
    public List<BookingDto> findByAll(){
        return service.findByAll();
    }

    @PutMapping
    public BookingDto update(@RequestBody BookingDto booking){
        return service.update(booking);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id){
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
