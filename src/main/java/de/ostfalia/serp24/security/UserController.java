package de.ostfalia.serp24.security;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("")
public class UserController {


    @GetMapping("/user")
    public Map<String, Object> user(@AuthenticationPrincipal OidcUser oidcUser) {
        if (oidcUser == null) {
            throw new RuntimeException("User not authenticated");
        }
        Map<String, Object> userInfo = new HashMap<>();
        userInfo.put("name", oidcUser.getFullName());
        userInfo.put("email", oidcUser.getEmail());

        List<String> roles = oidcUser.getAuthorities().stream()
                .map(grantedAuthority -> grantedAuthority.getAuthority())
                .collect(Collectors.toList());

        userInfo.put("roles", roles);

        return userInfo;
    }
}
