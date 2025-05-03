package br.com.bookingpraia.management.repository;

import br.com.bookingpraia.management.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
}
