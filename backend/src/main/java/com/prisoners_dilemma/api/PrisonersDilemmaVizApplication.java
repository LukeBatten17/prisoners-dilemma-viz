package com.prisoners_dilemma.api;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class PrisonersDilemmaVizApplication {

	public static void main(String[] args) {
		SpringApplication.run(PrisonersDilemmaVizApplication.class, args);
	}

}
