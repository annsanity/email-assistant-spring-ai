package com.email.email_assistant_springboot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.reactive.function.client.WebClient;

@SpringBootApplication
public class EmailAssistantApplication {

	public static void main(String[] args) {
		SpringApplication.run(EmailAssistantApplication.class, args);
	}

	@Bean
	public WebClient webClient() {
		return WebClient.builder()
				.build();
	}
}
