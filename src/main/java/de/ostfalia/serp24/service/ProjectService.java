package de.ostfalia.serp24.service;

import de.ostfalia.serp24.Exceptions.NotFoundException;
import de.ostfalia.serp24.model.Consultant;
import de.ostfalia.serp24.model.Customer;
import de.ostfalia.serp24.model.Project;
import de.ostfalia.serp24.model.ProjectConsultant;
import de.ostfalia.serp24.repository.ConsultantRepository;
import de.ostfalia.serp24.repository.ProjectRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

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

            //add all projectconsultants that are not already in the list
            for(ProjectConsultant pc : project.getProjectStaff()){
                pc.setProject(projectToUpdate);//setup to make them comparable projectId == projectId && consultantId == consultantId

                if(!projectToUpdate.getProjectStaff().contains(pc)){
                    projectToUpdate.getProjectStaff().add(pc);
                }
            }

            //remove all projectconsultants that are currently in the list but not in the new one
            projectToUpdate.getProjectStaff().removeIf(pc -> !project.getProjectStaff().contains(pc));

            project.setProjectStaff(null);//force skip on projectstaff in modelmapper
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
        List<Long> projectIds = consultant.getBookedProjects().stream().map(x -> x.getProject().getId()).toList();
        return projectRepository.findAllById(projectIds);
    }

    public List<Customer> findAllCustomers(){
        /*return projectRepository.findAll()
                .stream()
                .map(Project::getCustomer)
                .distinct()
                .toList();*/
        return projectRepository.findAllCustomers();
    }
    public List<Consultant> findAllConsultants(){
        /*return projectRepository.findAll()
                .stream()
                .map(Project::getProjectStaff)
                .flatMap(Collection::stream)
                .distinct()
                .collect(Collectors.toList());*/
        return projectRepository.findAllConsultants();
    }
}
