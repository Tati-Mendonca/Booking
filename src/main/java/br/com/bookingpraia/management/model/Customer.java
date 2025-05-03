package br.com.bookingpraia.management.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

import java.util.List;

@Data
@Entity
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String username;
//    @Pattern(regexp = "(?:(^\\\\+\\\\d{2})?)(?:([1-9]{2})|([0-9]{3})?)(\\\\d{4,5}).?(\\\\d{4})")
    private String phone;

    @OneToMany(mappedBy = "customer")
    private List<Booking> bookings;
}
