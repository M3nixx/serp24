package de.ostfalia.serp24.api;

import de.ostfalia.serp24.model.*;
import de.ostfalia.serp24.service.ProjectService;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ProjectApiDelegateImpl implements ProjectsApiDelegate{
    private ProjectService projectService;
    private ModelMapper modelMapper;

    public ProjectApiDelegateImpl(ProjectService projectService, ModelMapper mapper) {
        this.projectService = projectService;
        this.modelMapper = mapper;
    }

    @Override
    public ResponseEntity<List<ProjectDTO>> getProjects() {
        List<Project> projects = projectService.findAll();
        List<ProjectDTO> result;

        result = projects.stream()
                .map(project -> modelMapper.map(project, ProjectDTO.class))
                .toList();


        return ResponseEntity.ok(result);
    }

    @Override
    public ResponseEntity<ProjectDTO> createProject(ProjectDTO ProjectDTO) {
        Project project = modelMapper.map(ProjectDTO, Project.class);
        project = projectService.save(project);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(modelMapper.map(project, ProjectDTO.class));
    }

    @Override
    public ResponseEntity<ProjectDTO> getProject(Long id) {
        Project project = projectService.findById(id);

        return ResponseEntity.ok(modelMapper.map(project, ProjectDTO.class));
    }

    @Override
    public ResponseEntity<ProjectDTO> updateProject(Long id, ProjectDTO ProjectDTO) {
        Project project = modelMapper.map(ProjectDTO, Project.class);
        project = projectService.updateById(id, project);
        return ResponseEntity.ok(modelMapper.map(project, ProjectDTO.class));
    }

    @Override
    public ResponseEntity<Void> deleteProject(Long id) {
        projectService.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @Override
    public ResponseEntity<List<ProjectDTO>> getProjectsByConsultant(Long id) {
        List<Project> projects = projectService.findProjectsByConsultantId(id);
        List<ProjectDTO> result;

        result = projects.stream()
                .map(project -> modelMapper.map(project, ProjectDTO.class))
                .toList();

        return ResponseEntity.ok(result);
    }

    @Override
    public ResponseEntity<List<ProjectCustomerDTO>> getAllCustomers() {
        List<Customer> customers = projectService.findAllCustomers();
        List<ProjectCustomerDTO> result;

        result = customers.stream()
                .map(customer -> modelMapper.map(customer, ProjectCustomerDTO.class))
                .toList();

        return ResponseEntity.ok(result);
    }

    @Override
    public ResponseEntity<List<ProjectConsultantDTO>> getAllConsultants() {
        List<Consultant> consultants = projectService.findAllConsultants();
        List<ProjectConsultantDTO> result;

        result = consultants.stream()
                .map(consultant -> modelMapper.map(consultant, ProjectConsultantDTO.class))
                .toList();

        return ResponseEntity.ok(result);
    }
}
