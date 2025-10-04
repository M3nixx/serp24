package de.ostfalia.serp24.service;

import de.ostfalia.serp24.Exceptions.NotFoundException;
import de.ostfalia.serp24.model.Consultant;
import de.ostfalia.serp24.model.Customer;
import de.ostfalia.serp24.model.Project;
import de.ostfalia.serp24.repository.ConsultantRepository;
import de.ostfalia.serp24.repository.ProjectRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProjectService {
    private final ProjectRepository projectRepository;
    private final ConsultantRepository consultantRepository;
    private ModelMapper modelMapper;

    public ProjectService(ProjectRepository projectRepository, ModelMapper modelMapper, ConsultantRepository consultantRepository) {
        this.projectRepository = projectRepository;
        this.modelMapper = modelMapper;
        this.consultantRepository = consultantRepository;
    }

    public List<Project> findAll() {
        return projectRepository.findAll();
    }
    public Project save(Project project) {
        return projectRepository.save(project);
    }
    public Project findById(Long id) {
        return projectRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Project not found with id: " + id));
    }
    public Project updateById(Long id, Project project) {
        if (!projectRepository.existsById(id)) {
            throw new NotFoundException("Project not found with id: " + id);
        }else {
            Project projectToUpdate = findById(id);
            modelMapper.map(project, projectToUpdate);

            return save(projectToUpdate);
        }
    }
    public void deleteById(Long id) {
        if (!projectRepository.existsById(id)) {
            throw new NotFoundException("Project not found with id: " + id);
        }
        projectRepository.deleteById(id);
    }

    public List<Project> findProjectsByConsultantId(Long id){
        Consultant consultant = consultantRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Consultant not found with id: " + id));
        List<Long> projectIds = consultant.getBookedProjects().stream().map(Project::getId).toList();
        return projectRepository.findAllById(projectIds);
    }

    public List<Customer> findAllCustomers(){
        return projectRepository.findAll()
                .stream()
                .map(Project::getCustomer)
                .distinct()
                .toList();
    }
    public List<Consultant> findAllConsultants(){
        return projectRepository.findAll()
                .stream()
                .map(Project::getProjectStaff)
                .flatMap(Collection::stream)
                .distinct()
                .collect(Collectors.toList());
    }
}
