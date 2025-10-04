package de.ostfalia.serp24.api;

import de.ostfalia.serp24.model.User;
import de.ostfalia.serp24.model.UserDTO;
import de.ostfalia.serp24.model.UserDTO;
import de.ostfalia.serp24.service.UserService;
import de.ostfalia.serp24.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class UserApiDelegateImpl implements UsersApiDelegate {
    private UserService userService;
    private ModelMapper modelMapper;

    public UserApiDelegateImpl(UserService userService, ModelMapper mapper) {
        this.userService = userService;
        this.modelMapper = mapper;
    }

    @Override
    public ResponseEntity<List<UserDTO>> getUsers() {
        List<User> users = userService.findAll();
        List<UserDTO> result;

        result = users.stream()
                .map(user -> modelMapper.map(user, UserDTO.class))
                .toList();


        return ResponseEntity.ok(result);
    }

    @Override
    public ResponseEntity<UserDTO> createUser(UserDTO UserDTO) {
        User user = modelMapper.map(UserDTO, User.class);
        user = userService.save(user);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(modelMapper.map(user, UserDTO.class));
    }

    @Override
    public ResponseEntity<UserDTO> getUser(Long id) {
        User user = userService.findById(id);

        return ResponseEntity.ok(modelMapper.map(user, UserDTO.class));
    }

    @Override
    public ResponseEntity<UserDTO> updateUser(Long id, UserDTO UserDTO) {
        User user = modelMapper.map(UserDTO, User.class);
        user = userService.updateById(id, user);
        return ResponseEntity.ok(modelMapper.map(user, UserDTO.class));
    }

    @Override
    public ResponseEntity<Void> deleteUser(Long id) {
        userService.deleteById(id);
        return ResponseEntity.ok().build();
    }
}