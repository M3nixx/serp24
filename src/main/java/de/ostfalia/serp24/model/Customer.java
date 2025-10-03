package de.ostfalia.serp24.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;


@Entity
@Getter
@Setter
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long customerId;
    String name;
    String city;

    @OneToMany(mappedBy = "customer")
    List<Project> projects;
}
