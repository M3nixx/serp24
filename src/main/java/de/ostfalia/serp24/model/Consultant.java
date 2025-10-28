package de.ostfalia.serp24.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
public class Consultant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    String name;


    @OneToMany(mappedBy = "consultant", cascade = CascadeType.MERGE, orphanRemoval = true)
    private List<ProjectConsultant> bookedProjects;


    @OneToMany(mappedBy = "consultant", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Entry> entries;

}
