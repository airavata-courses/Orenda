package com.example.data_analysis;

import com.example.data_analysis.engine.Consumer;
import com.example.data_analysis.engine.Producer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class DemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
		
	}

	@Bean
	public Consumer consumerCode(){
		return new Consumer();
	}
		
	@Bean
	public Producer produceCode(){
		return new Producer();
	}


}
