package de.ostfalia.serp24.service;

import de.ostfalia.serp24.Exceptions.NotFoundException;
import de.ostfalia.serp24.model.Consultant;
import de.ostfalia.serp24.model.Customer;
import de.ostfalia.serp24.model.Entry;
import de.ostfalia.serp24.model.Project;
import de.ostfalia.serp24.repository.ConsultantRepository;
import de.ostfalia.serp24.repository.ProjectRepository;
import de.ostfalia.serp24.repository.TimeRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TimeService {
    private final TimeRepository timeRepository;
    private final ConsultantRepository consultantRepository;
    private final ProjectRepository projectRepository;
    private ModelMapper modelMapper;

    public TimeService(TimeRepository timeRepository, ModelMapper modelMapper,
                       ConsultantRepository consultantRepository, ProjectRepository projectRepository) {
        this.timeRepository = timeRepository;
        this.modelMapper = modelMapper;
        this.consultantRepository = consultantRepository;
        this.projectRepository = projectRepository;
    }

    public List<Entry> findAll() {
        return timeRepository.findAll();
    }

    public List<Entry> findByConsultantId(Long id){
        return timeRepository.findByConsultantId(id);
    }
    public Entry findByEntryIdAndConsultantId(Long entryId, Long consultantId){
        return timeRepository.findByEntryIdAndAndConsultant_Id(entryId, consultantId);
    }

    public Entry saveByConsultantId(Long consultantId, Entry entry) {
        Consultant consultant = consultantRepository.findById(consultantId)
                .orElseThrow(() -> new NotFoundException("Consultant not found with id: " + consultantId));

        entry.setConsultant(consultant);
        if(entry.getProject() != null && entry.getProject().getName() == null){
            entry.setProject(projectRepository.findById(entry.getProject().getId())
                    .orElseThrow(() -> new NotFoundException("Project not found with id: " + entry.getProject().getId()))
            );
        }
        return timeRepository.save(entry);
    }

    public Entry updateById(Long consultantId, Long entryId, Entry entry) {
        if (!timeRepository.existsById(entryId)) {
            throw new NotFoundException("Entry not found with id: " + entryId);
        }else {
            Entry entryToUpdate = findById(entryId);

            modelMapper.map(entry, entryToUpdate);
            return saveByConsultantId(consultantId, entryToUpdate);
        }
    }

    public List<Project> findAllProjects(){
        /*return timeRepository.findAll()
                .stream()
                .map(Entry::getProject)
                .distinct()
                .toList();*/
        return timeRepository.findAllProjects();
    }
    public List<Consultant> findAllConsultants(){
        /*return timeRepository.findAll()
                .stream()
                .map(Entry::getConsultant)
                .distinct()
                .toList();*/
        return timeRepository.findAllConsultants();
    }


    public Entry findById(Long id) {
        return timeRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Entry not found with id: " + id));
    }
    public Entry save(Entry entry) {
        return timeRepository.save(entry);
    }
}

