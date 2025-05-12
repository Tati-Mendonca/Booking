package br.com.bookingpraia.management.repository;

import br.com.bookingpraia.management.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByCustomerId(Long customerId);

    List<Booking> findByInputBetween(LocalDate start, LocalDate end);
}
