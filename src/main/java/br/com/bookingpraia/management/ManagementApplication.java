package br.com.bookingpraia.management;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ManagementApplication {

	public static void main(String[] args) {
		System.out.println("APLICAÇÃO RODOU...");
		SpringApplication.run(ManagementApplication.class, args);
	}

}
