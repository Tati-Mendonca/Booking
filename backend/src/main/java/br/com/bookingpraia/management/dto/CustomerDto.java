package br.com.bookingpraia.management.dto;

import lombok.Data;

@Data
public class CustomerDto {
    private Long id;
    private String name;
    private String username;
    private String phone;
}
