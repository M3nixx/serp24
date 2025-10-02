package de.ostfalia.serp24;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = { SecurityAutoConfiguration.class })
public class Serp24Application {

    public static void main(String[] args) {
        SpringApplication.run(Serp24Application.class, args);
    }

}
