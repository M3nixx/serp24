package de.ostfalia.serp24.service;

import de.ostfalia.serp24.Exceptions.NotFoundException;
import de.ostfalia.serp24.model.Consultant;
import de.ostfalia.serp24.model.Customer;
import de.ostfalia.serp24.repository.ConsultantRepository;
import de.ostfalia.serp24.repository.CustomerRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

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
