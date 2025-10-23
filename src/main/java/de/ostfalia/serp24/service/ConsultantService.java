package de.ostfalia.serp24.service;

import de.ostfalia.serp24.Exceptions.NotFoundException;
import de.ostfalia.serp24.model.Consultant;
import de.ostfalia.serp24.model.Customer;
import de.ostfalia.serp24.model.Project;
import de.ostfalia.serp24.model.ProjectConsultant;
import de.ostfalia.serp24.repository.ConsultantRepository;
import de.ostfalia.serp24.repository.CustomerRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ConsultantService {
    private final ConsultantRepository consultantRepository;
    private ModelMapper modelMapper;

    public ConsultantService(ConsultantRepository consultantRepository, ModelMapper modelMapper) {
        this.consultantRepository = consultantRepository;
        this.modelMapper = modelMapper;
    }

    public List<Consultant> findAll() {
        return consultantRepository.findAll();
    }
    public Consultant save(Consultant consultant) {
        return consultantRepository.save(consultant);
    }
    public Consultant findById(Long id) {
        return consultantRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Consultant not found with id: " + id));
    }
    public Consultant updateById(Long id, Consultant consultant) {
        if (!consultantRepository.existsById(id)) {
            throw new NotFoundException("Consultant not found with id: " + id);
        }else {
            Consultant consultantToUpdate = findById(id);

            //add all projectconsultants that are not already in the list
            for(ProjectConsultant pc : consultant.getBookedProjects()){
                pc.setConsultant(consultantToUpdate);//setup to make them comparable projectId == projectId && consultantId == consultantId

                if(!consultantToUpdate.getBookedProjects().contains(pc)){
                    consultantToUpdate.getBookedProjects().add(pc);
                }
            }

            //remove all projectconsultants that are currently in the list but not in the new one
            for(ProjectConsultant pc : consultantToUpdate.getBookedProjects()){
                if(!consultant.getBookedProjects().contains(pc)){
                    consultantToUpdate.getBookedProjects().remove(pc);
                }
            }

            consultant.setBookedProjects(null);//force skip on projectstaff in modelmapper

            modelMapper.map(consultant, consultantToUpdate);

            return save(consultantToUpdate);
        }
    }
    public void deleteById(Long id) {
        if (!consultantRepository.existsById(id)) {
            throw new NotFoundException("Consultant not found with id: " + id);
        }
        consultantRepository.deleteById(id);
    }
}
