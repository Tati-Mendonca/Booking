package br.com.bookingpraia.management.service;

import br.com.bookingpraia.management.dto.BookingDto;
import br.com.bookingpraia.management.model.Booking;
import br.com.bookingpraia.management.model.Customer;
import br.com.bookingpraia.management.repository.BookingRepository;
import br.com.bookingpraia.management.repository.CustomerRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.YearMonth;
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
        if (bookingDto.getOutput().isBefore(bookingDto.getInput()) || bookingDto.getOutput().isEqual(bookingDto.getInput())) {
            throw new IllegalArgumentException("A data de saída deve ser posterior à data de entrada.");
        }
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

    public BookingDto update(BookingDto booking) {
        if (booking.getOutput().isBefore(booking.getInput()) || booking.getOutput().isEqual(booking.getInput())) {
            throw new IllegalArgumentException("A data de saída deve ser posterior à data de entrada.");
        }
        Booking existing = bookingRepository.findById(booking.getId())
                .orElseThrow(() -> new RuntimeException("Id não encontrado"));
        modelMapper.map(booking, existing);
        Booking updated = bookingRepository.save(existing);
        return modelMapper.map(updated, BookingDto.class);
    }

    public void delete(Long id) {
        if (!bookingRepository.existsById(id)){
            throw new RuntimeException("Cliente não encontrado");
        }
        bookingRepository.deleteById(id);
    }

    public List<BookingDto> findBookingsByMonth(String month) {
        List<Booking> bookings;
        try {
            if (month != null) {
                month = month.trim();
                YearMonth yearMonth = YearMonth.parse(month);
                LocalDate start = yearMonth.atDay(1);
                LocalDate end = yearMonth.atEndOfMonth();
                bookings = bookingRepository.findByInputBetween(start, end);
            } else {
                bookings = bookingRepository.findAll();
            }
        } catch (Exception e) {
            bookings = bookingRepository.findAll();
        }
        return bookings.stream()
                .map(b -> modelMapper.map(b, BookingDto.class))
                .collect(Collectors.toList());
    }
}
