package de.ostfalia.serp24.repository;

import de.ostfalia.serp24.model.Consultant;
import de.ostfalia.serp24.model.Customer;
import de.ostfalia.serp24.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    @Query("select distinct p.customer from Project p")
    List<Customer> findAllCustomers();
    @Query("select distinct c from Project p JOIN p.projectStaff c")
    List<Consultant> findAllConsultants();
}
