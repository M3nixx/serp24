package de.ostfalia.serp24.repository;

import de.ostfalia.serp24.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
}
