package br.com.bookingpraia.management.controller;

import br.com.bookingpraia.management.dto.BookingDto;
import br.com.bookingpraia.management.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/booking/v1")
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
    public ResponseEntity<List<BookingDto>>findBookingByMonth(
            @RequestParam(required = false) String month){
        List<BookingDto> bookings = service.findBookingsByMonth(month);
        return ResponseEntity.ok(bookings);
    }

    @PutMapping("/{id}")
    public BookingDto update(@PathVariable Long id, @RequestBody BookingDto booking){
        return service.update(booking);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id){
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
