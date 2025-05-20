package br.com.bookingpraia.management.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class BookingDto {
    private Long id;
    private LocalDate input;
    private LocalDate output;
    private String price;
    private Long customerId;
    private String customerName;
    private Long days;
}
