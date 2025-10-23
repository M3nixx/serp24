package de.ostfalia.serp24.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
public class  Consultant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    String name;


    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "project_consultant",
            joinColumns = @JoinColumn(name = "project_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "consultant_id", referencedColumnName = "id"))
    List<Project> bookedProjects;


    @OneToMany(mappedBy = "consultant")
    private List<Entry> entries;

}
