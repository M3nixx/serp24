package de.ostfalia.serp24.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    String name;
    @Column(name = "start_date")
    LocalDateTime start;
    @Column(name = "end_date")
    LocalDateTime end;
    String status;

    @ManyToOne
    @JoinColumn(name="customer_id")
    Customer customer;

    @ManyToMany(mappedBy = "bookedProjects")
    List<Consultant> projectStaff;

    /*
    @OneToMany(mappedBy = "project")
    private List<Entry> entries;
    */
}
