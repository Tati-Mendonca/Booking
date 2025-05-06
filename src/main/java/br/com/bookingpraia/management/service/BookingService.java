package br.com.bookingpraia.management.service;

import br.com.bookingpraia.management.dto.BookingDto;
import br.com.bookingpraia.management.model.Booking;
import br.com.bookingpraia.management.model.Customer;
import br.com.bookingpraia.management.repository.BookingRepository;
import br.com.bookingpraia.management.repository.CustomerRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private ModelMapper modelMapper;

    public BookingDto create(BookingDto bookingDto){
        Customer customer = customerRepository.findById(bookingDto.getCustomerId())
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));

        Booking booking = modelMapper.map(bookingDto, Booking.class);
        booking.setCustomer(customer);

        Booking saved = bookingRepository.save(booking);
        return modelMapper.map(saved, BookingDto.class);
    }

    public BookingDto findById(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Id não encontrado"));
        return modelMapper.map(booking, BookingDto.class);
    }

    public List<BookingDto> findByCustomerId(Long customerId) {
        List<Booking> bookings = bookingRepository.findByCustomerId(customerId);
        return bookings.stream()
                .map(booking -> modelMapper.map(booking, BookingDto.class))
                .collect(Collectors.toList());
    }

    public List<BookingDto> findByAll() {
        List<Booking> bookings = bookingRepository.findAll();

        return bookings.stream().map(booking -> {
            BookingDto dto = new BookingDto();
            dto.setId(booking.getId());
            dto.setInput(booking.getInput());
            dto.setOutput(booking.getOutput());
            dto.setPrice(booking.getPrice());
            dto.setCustomerId(booking.getCustomer().getId());
            dto.setCustomerName(booking.getCustomer().getName());
            long days = ChronoUnit.DAYS.between(booking.getInput(), booking.getOutput());
            dto.setDays(days);
            return dto;

        }).collect(Collectors.toList());
    }

    public BookingDto update(BookingDto customer) {
        Booking existing = bookingRepository.findById(customer.getId())
                .orElseThrow(() -> new RuntimeException("Id não encontrado"));
        modelMapper.map(customer, existing);
        Booking updated = bookingRepository.save(existing);
        return modelMapper.map(updated, BookingDto.class);

    }

    public void delete(Long id) {
        if (!bookingRepository.existsById(id)){
            throw new RuntimeException("Cliente não encontrado");
        }
        bookingRepository.deleteById(id);
    }
}
